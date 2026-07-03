import { PrivacyHeader } from "@/components/grace-hymns/privacy-header";
import { PrivacyFooter } from "@/components/grace-hymns/privacy-footer";

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrivacyHeader />
      {children}
      <PrivacyFooter />
    </>
  );
}
