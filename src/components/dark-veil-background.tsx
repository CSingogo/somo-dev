"use client";

import dynamic from "next/dynamic";

const DarkVeil = dynamic(() => import("@/components/DarkVeil"), {
  ssr: false,
});

export function DarkVeilBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <DarkVeil hueShift={220} speed={0.4} warpAmount={0.3} />
    </div>
  );
}
