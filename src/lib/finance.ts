// Shared financial logic for PropertyPointers tools.
// All calculations are indicative and India-focused (₹, lakh/crore formatting).

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatNumber(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(amount);
}

// Compact Indian formatting: ₹1.04 Cr, ₹54.1 Lakh, ₹43,391
export function formatINRShort(amount: number): string {
  const n = Math.abs(amount);
  if (n >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)} Lakh`;
  return `₹${formatNumber(Math.round(amount))}`;
}

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

export function computeEmi(loanAmount: number, annualRate: number, tenureYears: number): EmiResult {
  const n = Math.max(0, Math.round(tenureYears * 12));
  const p = Math.max(0, loanAmount);
  const r = annualRate / 12 / 100;
  if (n === 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  if (r === 0) {
    const emi = p / n;
    return { emi, totalPayment: p, totalInterest: 0 };
  }
  const pow = Math.pow(1 + r, n);
  const emi = (p * r * pow) / (pow - 1);
  const totalPayment = emi * n;
  return { emi, totalPayment, totalInterest: totalPayment - p };
}

export interface AmortizationYear {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
  percentPaid: number;
}

export function buildAmortizationSchedule(
  loanAmount: number,
  annualRate: number,
  tenureYears: number
): AmortizationYear[] {
  const months = Math.max(0, Math.round(tenureYears * 12));
  const r = annualRate / 12 / 100;
  const { emi } = computeEmi(loanAmount, annualRate, tenureYears);
  const rows: AmortizationYear[] = [];
  let balance = loanAmount;

  for (let y = 1; y <= tenureYears; y++) {
    const opening = balance;
    let principalPaid = 0;
    let interestPaid = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < months; m++) {
      const interest = balance * r;
      const principal = Math.min(emi - interest, balance);
      interestPaid += interest;
      principalPaid += principal;
      balance = Math.max(0, balance - principal);
    }
    rows.push({
      year: y,
      openingBalance: opening,
      principalPaid,
      interestPaid,
      closingBalance: balance,
      percentPaid: loanAmount > 0 ? ((loanAmount - balance) / loanAmount) * 100 : 0,
    });
  }
  return rows;
}

export interface BankRate {
  bank: string;
  rate: number;
}

// Indicative published floor rates, May 2026. Verify with the lender.
export const BANK_RATES: BankRate[] = [
  { bank: "SBI", rate: 8.25 },
  { bank: "PNB", rate: 8.4 },
  { bank: "HDFC", rate: 8.5 },
  { bank: "Bank of Baroda", rate: 8.5 },
  { bank: "Kotak", rate: 8.7 },
  { bank: "ICICI", rate: 9.0 },
  { bank: "Axis", rate: 9.25 },
];

// ── Rental yield ──
export function computeRentalYield(propertyValue: number, monthlyRent: number) {
  if (propertyValue <= 0) return { grossYield: 0, annualRent: 0 };
  const annualRent = monthlyRent * 12;
  return { grossYield: (annualRent / propertyValue) * 100, annualRent };
}

// ── ROI ──
export function computeRoi(initial: number, final: number, years = 1) {
  if (initial <= 0) return { totalRoi: 0, annualised: 0, gain: 0 };
  const gain = final - initial;
  const totalRoi = (gain / initial) * 100;
  const annualised = years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : totalRoi;
  return { totalRoi, annualised, gain };
}

// ── Home loan eligibility (FOIR / income-multiplier based) ──
export function computeLoanEligibility(params: {
  monthlyIncome: number;
  existingEmi: number;
  annualRate: number;
  tenureYears: number;
  foir?: number; // fixed-obligation-to-income ratio, default 0.5
}) {
  const foir = params.foir ?? 0.5;
  const maxEmi = Math.max(0, params.monthlyIncome * foir - params.existingEmi);
  const r = params.annualRate / 12 / 100;
  const n = Math.round(params.tenureYears * 12);
  let eligibleLoan = 0;
  if (r === 0) {
    eligibleLoan = maxEmi * n;
  } else {
    const pow = Math.pow(1 + r, n);
    eligibleLoan = (maxEmi * (pow - 1)) / (r * pow);
  }
  return { maxEmi, eligibleLoan };
}

// ── Affordability ──
export function computeAffordability(params: {
  monthlyIncome: number;
  existingEmi: number;
  downPayment: number;
  annualRate: number;
  tenureYears: number;
  foir?: number;
}) {
  const { eligibleLoan, maxEmi } = computeLoanEligibility(params);
  const propertyBudget = eligibleLoan + params.downPayment;
  return { maxEmi, eligibleLoan, propertyBudget };
}

// ── Construction cost ──
export type ConstructionQuality = "basic" | "standard" | "premium" | "luxury";

// Indicative all-in cost per sq ft (₹), May 2026.
export const CONSTRUCTION_RATES: Record<ConstructionQuality, { label: string; perSqft: number }> = {
  basic: { label: "Basic", perSqft: 1500 },
  standard: { label: "Standard", perSqft: 1900 },
  premium: { label: "Premium", perSqft: 2500 },
  luxury: { label: "Luxury", perSqft: 3500 },
};

export function computeConstructionCost(builtUpArea: number, quality: ConstructionQuality) {
  const rate = CONSTRUCTION_RATES[quality].perSqft;
  const total = builtUpArea * rate;
  // Indicative cost split.
  return {
    total,
    rate,
    breakdown: {
      civil: total * 0.55,
      finishing: total * 0.25,
      mep: total * 0.12, // mechanical, electrical, plumbing
      fees: total * 0.08,
    },
  };
}

// ── Stamp duty by state (indicative, May 2026) ──
export interface StampDutyState {
  state: string;
  male: number; // %
  female: number; // %
  registration: number; // %
}

export const STAMP_DUTY_STATES: StampDutyState[] = [
  { state: "Delhi", male: 6, female: 4, registration: 1 },
  { state: "Maharashtra", male: 6, female: 5, registration: 1 },
  { state: "Karnataka", male: 5, female: 5, registration: 1 },
  { state: "Uttar Pradesh", male: 7, female: 6, registration: 1 },
  { state: "Haryana", male: 7, female: 5, registration: 1 },
  { state: "Tamil Nadu", male: 7, female: 7, registration: 4 },
  { state: "Telangana", male: 7.5, female: 7.5, registration: 0.5 },
  { state: "Gujarat", male: 4.9, female: 4.9, registration: 1 },
  { state: "Rajasthan", male: 6, female: 5, registration: 1 },
  { state: "West Bengal", male: 7, female: 7, registration: 1 },
];

export function computeStampDuty(params: {
  propertyValue: number;
  state: string;
  gender: "male" | "female";
}) {
  const row = STAMP_DUTY_STATES.find((s) => s.state === params.state) ?? STAMP_DUTY_STATES[0];
  const dutyPct = params.gender === "female" ? row.female : row.male;
  const stampDuty = (params.propertyValue * dutyPct) / 100;
  const registration = (params.propertyValue * row.registration) / 100;
  return {
    dutyPct,
    registrationPct: row.registration,
    stampDuty,
    registration,
    totalCharges: stampDuty + registration,
    totalOutlay: params.propertyValue + stampDuty + registration,
  };
}

// ── Rent vs Buy ──
export function computeRentVsBuy(params: {
  propertyPrice: number;
  downPayment: number;
  annualRate: number;
  tenureYears: number;
  monthlyRent: number;
  rentGrowthPct: number; // annual %
  appreciationPct: number; // annual %
  horizonYears: number;
}) {
  const loan = Math.max(0, params.propertyPrice - params.downPayment);
  const { emi } = computeEmi(loan, params.annualRate, params.tenureYears);

  // Buying cost over the horizon: EMIs paid + down payment - equity (property value - outstanding).
  const monthsInHorizon = params.horizonYears * 12;
  const emiMonths = Math.min(monthsInHorizon, params.tenureYears * 12);
  const totalEmiPaid = emi * emiMonths;

  // Outstanding balance at horizon.
  const schedule = buildAmortizationSchedule(loan, params.annualRate, params.tenureYears);
  const yearRow = schedule[Math.min(params.horizonYears, schedule.length) - 1];
  const outstanding = yearRow ? yearRow.closingBalance : 0;
  const propertyValueAtHorizon =
    params.propertyPrice * Math.pow(1 + params.appreciationPct / 100, params.horizonYears);
  const equity = propertyValueAtHorizon - outstanding;
  const netBuyingCost = params.downPayment + totalEmiPaid - equity;

  // Renting cost over the horizon with annual rent growth.
  let totalRentPaid = 0;
  let currentRent = params.monthlyRent;
  for (let y = 0; y < params.horizonYears; y++) {
    totalRentPaid += currentRent * 12;
    currentRent *= 1 + params.rentGrowthPct / 100;
  }

  return {
    emi,
    netBuyingCost,
    totalRentPaid,
    propertyValueAtHorizon,
    equity,
    recommendation: netBuyingCost < totalRentPaid ? "buy" : "rent",
    savings: Math.abs(totalRentPaid - netBuyingCost),
  };
}
