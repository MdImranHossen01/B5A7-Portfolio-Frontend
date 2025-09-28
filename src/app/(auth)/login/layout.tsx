// src/app/(auth)/login/layout.tsx
export const metadata = {
  title: "Login | Portfolio",
  description: "Login to your portfolio account to access private features.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}