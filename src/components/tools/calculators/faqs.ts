// Plain (server-safe) FAQ data shared by tool pages (server) and calculator
// components (client). Must NOT be a "use client" module, otherwise importing
// these arrays into a server component turns them into client-reference proxies.

export interface FaqEntry {
  question: string;
  answer: string;
}

export const EMI_FAQ: FaqEntry[] = [
  { question: "What is EMI for ₹50 lakh home loan at 8.5% for 20 years?", answer: "Monthly EMI is about ₹43,391. Total interest is around ₹54.14 lakh, total repayment about ₹1.04 crore. Extending to 25 years reduces EMI to ₹40,359 but adds roughly ₹17L interest." },
  { question: "How is home loan EMI calculated in India?", answer: "EMI = [P×R×(1+R)^N] ÷ [(1+R)^N−1], where P = loan amount, R = monthly rate (annual ÷ 12 ÷ 100) and N = number of months. For ₹50L at 8.5% over 20 years the EMI is ₹43,391." },
  { question: "What EMI can I afford on a ₹1 lakh monthly income?", answer: "A safe EMI is 40-45% of income, i.e. ₹40,000-45,000. Lenders use the FOIR (fixed-obligation-to-income ratio) to decide eligibility, so existing EMIs reduce the amount you can borrow." },
  { question: "How can I reduce my home loan EMI?", answer: "Three ways: increase the tenure (lower EMI but more total interest), make part-prepayments, or improve your CIBIL score to 750+ to qualify for a lower rate." },
  { question: "Does this EMI include processing fees and insurance?", answer: "No. This is the indicative principal-plus-interest EMI using the standard banking formula. Actual EMI may differ due to processing fees, GST, insurance and bank-specific terms." },
];

export const STAMP_DUTY_FAQ: FaqEntry[] = [
  { question: "What is stamp duty on property in India?", answer: "Stamp duty is a state government tax on property transactions, typically 4-7.5% of the property value, plus a registration charge (usually about 1%). Rates vary by state and sometimes by the buyer's gender." },
  { question: "Do women pay lower stamp duty?", answer: "In several states (e.g. Delhi, Maharashtra, Rajasthan, UP, Haryana), women buyers get a 1-2% concession on stamp duty to encourage property ownership in women's names." },
  { question: "Is stamp duty included in a home loan?", answer: "Usually not. Banks fund up to 80-90% of the property value, but stamp duty and registration are normally paid by the buyer from their own funds." },
  { question: "Are stamp duty rates the same across India?", answer: "No. Each state sets its own rates, so the same property can attract very different charges in different states. Always verify the current rate on your state's registration department website." },
];

export const ROI_FAQ: FaqEntry[] = [
  { question: "What is a good ROI on property in India?", answer: "For residential property, a total appreciation that translates to 8-12% annualised return is considered healthy. Commercial and well-located plots can do better, but returns vary widely by city and micro-market." },
  { question: "What is the difference between total ROI and annualised ROI?", answer: "Total ROI is the overall percentage gain over the whole holding period. Annualised ROI (CAGR) expresses that as a yearly compounded rate, which makes it easy to compare investments held for different durations." },
  { question: "Does this ROI include rental income?", answer: "This calculator measures capital appreciation only (buy vs sell price). For income returns, use the Rental Yield calculator and add the two for a fuller picture." },
];

export const RENTAL_YIELD_FAQ: FaqEntry[] = [
  { question: "What is a good rental yield in India?", answer: "Residential gross rental yields in Indian metros are typically 2-4%. Commercial and co-living can reach 6-9%. A higher yield means better income relative to the property's price." },
  { question: "What is gross vs net rental yield?", answer: "Gross yield = annual rent ÷ property value. Net yield deducts maintenance, property tax, insurance and vacancy from the annual rent before dividing — it is a more realistic measure of actual returns." },
  { question: "How can I improve rental yield?", answer: "Buy in high-demand rental corridors, furnish the unit, reduce vacancy, and avoid overpaying at purchase. Yield falls when prices rise faster than rents." },
];

export const ELIGIBILITY_FAQ: FaqEntry[] = [
  { question: "How much home loan can I get on my salary?", answer: "Lenders typically allow your total EMIs (existing + new) to be 40-55% of your monthly income — the FOIR. On a ₹1 lakh income with no other EMIs, you can usually service a ₹45,000-50,000 EMI, supporting roughly a ₹50-60 lakh loan over 20 years." },
  { question: "What is FOIR in home loan eligibility?", answer: "FOIR (Fixed Obligation to Income Ratio) is the share of your income that goes to all loan EMIs. Most banks cap it around 50%. Lower existing obligations mean a higher eligible loan." },
  { question: "How can I increase my loan eligibility?", answer: "Add a co-applicant (e.g. spouse), choose a longer tenure, clear existing loans/credit-card dues, and improve your CIBIL score to 750+ for better terms." },
];

export const AFFORDABILITY_FAQ: FaqEntry[] = [
  { question: "How do I know what property I can afford?", answer: "Your property budget = the loan you can service (based on income and existing EMIs) + your down payment. This tool combines both to give a realistic maximum property price." },
  { question: "How much down payment do I need?", answer: "Banks fund up to 80-90% of the property value, so plan for a 10-20% down payment plus stamp duty, registration and other costs from your own funds." },
  { question: "Should I stretch to my maximum budget?", answer: "It's safer to keep your total EMIs below 40% of income and maintain an emergency fund. Buying at the absolute maximum leaves little room for rate hikes or income shocks." },
];

export const CONSTRUCTION_FAQ: FaqEntry[] = [
  { question: "What is the construction cost per sq ft in India in 2026?", answer: "Indicative all-in costs range from about ₹1,500/sq ft for basic construction to ₹3,500/sq ft for luxury finishes. Rates vary by city, material prices and labour." },
  { question: "What does construction cost include?", answer: "A typical estimate covers civil work (structure), finishing (flooring, paint, fittings), MEP (electrical, plumbing, mechanical) and professional fees. Land cost and approvals are separate." },
  { question: "How can I reduce construction cost?", answer: "Optimise the design, buy materials in bulk, avoid mid-project changes, and choose standard finishes. A good architect and clear BOQ prevent costly overruns." },
];

export const RENT_VS_BUY_FAQ: FaqEntry[] = [
  { question: "Is it better to rent or buy a house in India?", answer: "It depends on how long you'll stay, the price-to-rent ratio, and expected appreciation. Buying usually wins over long horizons (7+ years) in appreciating markets; renting can win if you move often or prices are stretched." },
  { question: "How does this calculator decide?", answer: "It compares the net cost of buying (down payment + EMIs − the equity/appreciation you build) against the total rent paid over the same horizon, including annual rent increases." },
  { question: "What factors does it not capture?", answer: "It simplifies tax benefits, maintenance, opportunity cost of the down payment, and transaction costs. Treat the result as directional, not absolute." },
];

export const RERA_FAQ: FaqEntry[] = [
  { question: "What is a RERA registration number?", answer: "Under the Real Estate (Regulation and Development) Act, every qualifying project must register with the state RERA authority and display a unique registration number. It lets buyers verify the project's legal status." },
  { question: "How do I verify a project on RERA?", answer: "Search the project name or RERA number on your state's official RERA portal (e.g. MahaRERA, UP-RERA). Check the registration status, validity, approved plan and any complaints before paying a token." },
  { question: "Is this tool an official RERA source?", answer: "No. This is an indicative helper that links you to the official state RERA portals. Always confirm details on the official portal before making any payment." },
];
