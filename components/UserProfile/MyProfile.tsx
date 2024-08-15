import { BellRing, Contact, QrCode, User } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import ContactDetail from "./ContactDetail/ContactDetail";
import MyProfileSideBar from "./MyProfileSideBar";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import TwoFactorAuth from "./ProfileDetail/TwoFactorAuth";
import NotificationSetting from "./Settings/NotificationSetting";

const MyProfile = () => {
	return (
		<div>
			<div className="flex gap-4 pr-6">
				<MyProfileSideBar />
				<Card className="mb-12 flex w-full  items-start justify-center gap-6 pb-28">
					<CardContent className="w-full">
						<Accordion type="single" collapsible defaultValue="item-1">
							<AccordionItem value="item-1">
								<AccordionTrigger className=" text-lg hover:no-underline">
									<span className="flex items-center gap-2">
										<User size={25} />
										የግለ መረጃ ዝርዝር
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<ProfileDetail />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger className=" text-lg hover:no-underline">
									<span className="flex items-center gap-2">
										<QrCode size={25} />
										ባለ ሁለት የማረጋገጫ ኮድ
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<TwoFactorAuth />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger className=" text-lg hover:no-underline">
									<span className="flex items-center gap-2">
										<Contact size={25} />
										የግል የእውቂያ መረጃ
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<ContactDetail />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger className=" text-lg hover:no-underline">
									<span className="flex items-center gap-2">
										<BellRing size={25} />
										የመልእክት ቅንብሮች
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<NotificationSetting />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default MyProfile;
