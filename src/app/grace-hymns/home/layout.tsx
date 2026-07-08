import { HomeHeader } from "@/components/grace-hymns/home-header";

export default function GraceHymnsHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden md:h-dvh md:overflow-x-hidden md:overflow-y-auto">
      <HomeHeader />
      {children}
    </div>
  );
}
