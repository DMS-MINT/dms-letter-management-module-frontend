"use server";

import { getSession } from "@/lib/features/authentication/actions";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
  const session = await getSession();

  if (!session) redirect("/signin");
  
  return <>{children}</>;
}
