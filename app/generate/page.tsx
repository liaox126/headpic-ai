import { Suspense } from "react";
import GeneratePage from "./GeneratePageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center"><p className="text-primary/50">Loading...</p></div>}>
      <GeneratePage />
    </Suspense>
  );
}
