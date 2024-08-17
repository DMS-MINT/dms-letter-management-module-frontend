import { getInitials } from "@/lib/utils/getInitials";
import type { CurrentUserType } from "@/types/user_module";
import { BriefcaseBusiness, Building2 } from "lucide-react";
import { Badge } from "../ui/badge";

const MyProfileSideBar = ({ myProfile }: { myProfile: CurrentUserType }) => {
	// const hasProfileImage = !!myProfile.image;
	const fullName = myProfile.full_name_am;
	const initials = getInitials(fullName);

	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				<div className="flex h-32 items-center justify-center rounded-sm border-4 border-dashed border-muted-foreground bg-gray-100 text-4xl text-muted-foreground">
					{initials}
				</div>
				<div className="flex items-center gap-2">
					<Building2 size={20} className="text-gray-600" />
					<p className="text-gray-600">Department</p>
				</div>
				<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-sm font-normal text-gray-900">
					{myProfile.department.department_name_am}
				</Badge>
				<div className="flex items-center gap-2">
					<BriefcaseBusiness size={20} className="text-gray-600" />
					<p className="text-gray-600">Job Title</p>
				</div>
				<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-sm font-normal text-gray-900">
					{myProfile.job_title.title_am}
				</Badge>
			</div>
		</section>
	);
};

export default MyProfileSideBar;
