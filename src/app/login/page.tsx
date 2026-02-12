import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth-session";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginRoutePage() {
  const user = await getServerAuthSession();
  if (user) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
