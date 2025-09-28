// src/app/(auth)/register/layout.tsx
export const metadata = {
  title: 'Register | Portfolio',
  description: 'Create a new account to access all features of the portfolio website.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}