import DarkVeil from "./DarkVeil.jsx";

export default function DarkVeilBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <DarkVeil hueShift={220} speed={0.4} warpAmount={0.3} />
    </div>
  );
}
