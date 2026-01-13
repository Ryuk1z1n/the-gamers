import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
  description: "Página de registro de usuário",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
