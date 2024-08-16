import { getInitials } from "@/lib/utils/getInitials";
import type { CurrentUserType } from "@/types/user_module";
import { BriefcaseBusiness, Building2 } from "lucide-react";

const MyProfileSideBar = ({ myProfile }: { myProfile: CurrentUserType }) => {
	// const hasProfileImage = !!myProfile.image;
	const fullName = myProfile.full_name;
	const initials = getInitials(fullName);

	return (
		<div>
			<div className="flex h-screen w-72 flex-col justify-start gap-4 px-10 py-8">
				{/* {hasProfileImage ? (
					<Image
						src={myProfile?.image}
						alt="Profile"
						width={400}
						height={400}
						className="rounded-sm border-4 border-muted-foreground"
					/>
				) : ( */}
				<div className="flex h-40 w-52 items-center justify-center rounded-sm border-4 border-dashed border-muted-foreground bg-gray-100 text-4xl text-muted-foreground">
					{initials}
				</div>
				{/* )} */}
				<span className="flex flex-col gap-2 ">
					<span className="flex items-center gap-2 text-sm text-muted-foreground">
						<Building2 size={18} />
						<p>Department</p>
					</span>
					<p className="rounded-md bg-gray-50 text-center text-sm text-muted-foreground">
						{" "}
						{myProfile.department.name_en}
					</p>
				</span>
				<span className="flex flex-col gap-2 ">
					<span className="flex items-center gap-2 text-sm text-muted-foreground">
						<BriefcaseBusiness size={18} />
						<p>Job Title</p>
					</span>
					<p className="rounded-md bg-gray-50 text-center text-sm text-muted-foreground">
						{" "}
						{myProfile.job_title}
					</p>
				</span>

				{/* <div className="flex flex-col gap-2">
					<span className="flex items-center gap-2 text-sm text-muted-foreground">
						<Paperclip size={18} />
						<p>Attachements</p>
					</span>
					<Button
						className="flex w-full items-center justify-between gap-2 bg-gray-300 text-sm text-muted-foreground"
						size={"sm"}
						variant={"outline"}
					>
						Attach File
						<Upload size={18} />
					</Button>
				</div> */}
			</div>
		</div>
	);
};

export default MyProfileSideBar;
