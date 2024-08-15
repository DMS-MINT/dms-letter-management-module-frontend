import { Dot } from "lucide-react";
import { Badge } from "../ui/badge";

const MyProfileTopBar = () => {
	return (
		<div>
			<div className="mx-10 flex h-14 items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">Jessica Jones</h1>
					<span>
						<Badge className="flex items-center justify-start bg-green-100 text-green-500">
							{" "}
							<Dot />
							Active
						</Badge>
					</span>
				</div>
				<h2>My Account</h2>
			</div>
		</div>
	);
};

export default MyProfileTopBar;
