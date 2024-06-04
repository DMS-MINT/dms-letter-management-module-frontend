"use client";

import { UserTypeEnum } from "@/typing/enum";
import ClerkTable from "./@clerk/page";
import StandardUserTable from "./@standard_user/page";
import { useAppSelector } from "@/lib/hooks";
import { selectLetters } from "@/lib/features/letter/letterSlice";

export default function Page() {
  const letters = useAppSelector(selectLetters);
  const userType: UserTypeEnum = UserTypeEnum.CLERK;

  return userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
    <ClerkTable letters={letters} />
  ) : (
    <StandardUserTable />
  );
}
