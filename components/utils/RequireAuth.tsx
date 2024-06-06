"use server";

import { get_session } from "@/lib/features/authentication/actions";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
  const session = await get_session();

  if (!session) redirect("/signin");

  return <>{children}</>;
}
