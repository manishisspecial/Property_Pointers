/** Landing path after login/register and target for "My Dashboard" in the nav. */
export function defaultDashboardHref(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "partner":
      return "/dashboard/partner";
    case "vendor":
      return "/dashboard/vendor";
    case "developer":
      return "/dashboard/developer";
    default:
      return "/dashboard";
  }
}

const ONBOARDING_ROLES = new Set(["partner", "vendor", "developer"]);

/** Partner, vendor, and developer accounts must complete profile details once. */
export function roleNeedsProfileOnboarding(role: string): boolean {
  return ONBOARDING_ROLES.has(role);
}

/** Where to send the user right after login/register (may be onboarding). */
export function postAuthDestination(user: {
  role: string;
  onboardingComplete?: boolean | null;
}): string {
  if (roleNeedsProfileOnboarding(user.role) && user.onboardingComplete !== true) {
    return "/onboarding";
  }
  return defaultDashboardHref(user.role);
}
