import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth-session";
import { SignupPage } from "@/components/auth/SignupPage";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignupRoutePage() {
  const user = await getServerAuthSession();
  if (user) {
    redirect("/dashboard");
  }

  return <SignupPage />;
}
