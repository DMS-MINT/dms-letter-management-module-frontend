//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button size={"icon"} variant={"outline"}>
//                     <MailIcon size={20} />
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Send Email</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex flex-col gap-4">
//                     <Input
//                         placeholder="Recipients (comma-separated)"
//                         value={emailData.recipients}
//                         onChange={(e) => handleInputChange("recipients", e.target.value)}
//                     />
//                     <Input
//                         placeholder="Subject"
//                         value={emailData.subject}
//                         onChange={(e) => handleInputChange("subject", e.target.value)}
//                     />
//                     <Textarea
//                         placeholder="Email Body"
//                         value={emailData.body}
//                         onChange={(e) => handleInputChange("body", e.target.value)}
//                     />
//                 </div>
//                 <DialogFooter>
//                     <Button variant="outline">Cancel</Button>
//                     <Button onClick={handleSendEmail} disabled={!emailData.recipients || !emailData.subject || !emailData.body}>
//                         Send
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );

"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MailIcon } from "lucide-react";
import { useState } from "react";

function EmailDialog() {
	const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation dialog

	const handleSendEmail = async () => {
		try {
			// Simulate email-sending logic
			console.log("Sending email...");
			// Replace this with your actual email API logic
			alert("Email sent successfully!");
		} catch (error) {
			console.error("Error sending email:", error);
			alert("Failed to send email.");
		}
		setShowConfirmation(false); // Close confirmation dialog after sending email
	};

	return (
		<Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"outline"}>
					<MailIcon size={20} />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Are you sure you want to send this email?</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setShowConfirmation(false)}>
						Cancel
					</Button>
					<Button onClick={handleSendEmail}>Yes, Send</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EmailDialog;
