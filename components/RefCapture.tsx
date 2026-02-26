"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RefCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      localStorage.setItem("hp_ref", ref);
    }
  }, [searchParams]);

  return null;
}
