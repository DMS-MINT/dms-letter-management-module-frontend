import { Building2, Paperclip, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const MyProfileSideBar = () => {
	return (
		<div>
			<div className=" flex h-screen w-72 flex-col justify-start gap-4 px-10 py-8">
				<Image
					src={"/images/placeholder.png"}
					alt="Profile"
					width={400}
					height={400}
					className="rounded-sm border-4 border-muted-foreground"
				/>
				<span className="flex items-center gap-2 text-muted-foreground">
					<Building2 />
					<p>Department Position</p>
				</span>
				<div className="flex flex-col gap-2">
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
				</div>
			</div>
		</div>
	);
};

export default MyProfileSideBar;
