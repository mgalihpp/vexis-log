import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth-session";
import { SignupPage } from "@/components/auth/SignupPage";

export default async function SignupRoutePage() {
  const user = await getServerAuthSession();
  if (user) {
    redirect("/dashboard");
  }

  return <SignupPage />;
}
