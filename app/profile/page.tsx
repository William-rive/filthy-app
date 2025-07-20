import NextAuth from "next-auth";
import { authOptions } from "../../auth/authSetup";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

const { auth } = NextAuth(authOptions);

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as (User & { role: string }) | undefined;
  if (!user) {
    redirect("/");
  }
  
  return <ProfilePageClient user={user} />;
}
