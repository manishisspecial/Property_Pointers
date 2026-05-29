"use client";

import { useEffect, useState } from "react";

interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
}

// Lightweight client-side session check used to gate advanced (premium) tool
// sections behind a free account. Mirrors the pattern used in Navbar.
export function useAuthGate(): AuthState {
  const [state, setState] = useState<AuthState>({ loading: true, isLoggedIn: false });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          setState({ loading: false, isLoggedIn: Boolean(data?.user) });
        } else {
          setState({ loading: false, isLoggedIn: false });
        }
      } catch {
        if (active) setState({ loading: false, isLoggedIn: false });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
