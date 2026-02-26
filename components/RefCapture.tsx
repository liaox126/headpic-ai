"use client";

import { useEffect } from "react";
import { Suspense } from "react";

function RefCaptureInner() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("hp_ref", ref);
    }
  }, []);

  return null;
}

export default function RefCapture() {
  return (
    <Suspense>
      <RefCaptureInner />
    </Suspense>
  );
}
