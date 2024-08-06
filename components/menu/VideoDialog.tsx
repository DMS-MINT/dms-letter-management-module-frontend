import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface VideoDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function VideoDialog({ isOpen, onClose }: VideoDialogProps) {
	const videoUrl =
		"https://drive.google.com/file/d/1Lj23UNXBDmNSfLuo8UtnacY5U4JjShh7/preview";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>የቪዲዮ እርዳታ</DialogTitle>
					<DialogDescription>የቪዲዮ እርዳታውን በመክፈት ይከታተሉ.</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center">
					<iframe
						src={videoUrl}
						width="640"
						height="450"
						allow="autoplay"
						frameBorder="0"
						className="w-full"
					></iframe>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>ዝጋ</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
