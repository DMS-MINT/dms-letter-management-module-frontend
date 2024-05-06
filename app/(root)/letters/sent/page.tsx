import { UserTypeEnum } from "@/typing/enum";
import ClerkTable from "./@clerk/page";
import StandardUserTable from "./@standard_user/page";

export default function Page() {
  const userType: UserTypeEnum = UserTypeEnum.CLERK;

  return userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
    <ClerkTable />
  ) : (
    <StandardUserTable />
  );
}
