"use client";

import clsx from "clsx";
import { useState } from "react";
import { Spinner } from "../helpers";
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
	const [isLoading, setIsLoading] = useState(true);
	const videoUrl =
		"https://drive.google.com/file/d/1Lj23UNXBDmNSfLuo8UtnacY5U4JjShh7/preview";

	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>የቪዲዮ እርዳታ</DialogTitle>
					<DialogDescription>የቪዲዮ እርዳታውን በመክፈት ይከታተሉ.</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center">
					{isLoading ? (
						<div className="flex h-[450px] w-[640px] items-center justify-center">
							<Spinner />
						</div>
					) : null}
					<iframe
						src={videoUrl}
						width="640"
						height="450"
						allow="autoplay"
						frameBorder="0"
						className={clsx("w-full", { hidden: isLoading })}
						onLoad={handleIframeLoad}
					></iframe>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>ዝጋ</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
