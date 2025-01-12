"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useSignaturePad } from "@/hooks/useSignaturePad";
import { CheckCircle2, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { SignatureCanvas } from "./SignatureCanvas";

export function SignatureAlertDialog({
	open,
	setOpen,
	isConnected,
	isLoading,
	reconnect,
	uploadSignatureImage,
	resetSignature,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isConnected: boolean;
	isLoading: boolean;
	reconnect: () => void;
	uploadSignatureImage: (signatureImage: string) => void;
	resetSignature: () => void;
}) {
	const {
		canvasRef,
		getSignature,
		padType,
		serialNumber,
		firmwareVersion,
		signatureImage,
		setSignatureImage,
		isImageCaptureSupported,
		signature_confirm_send,
		signature_retry_send,
		signature_cancel_send,
		clearCanvas,
		isLoading: padIsLoading,
		isConnected: padIsConnected,
	} = useSignaturePad();

	const [signature, setSignature] = useState<string | null>(null);

	const handleSaveSignature = (signatureData: string) => {
		setSignature(signatureData);
		uploadSignatureImage(signatureData);
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			getSignature(); // Fetch signature or perform other actions
		}
	}, [open, getSignature]);

	const getDialogDescription = () => {
		if (isLoading) return "Connecting to the server...";
		if (!isConnected) return "Unable to connect to the server. Please try again.";
		if (padIsLoading) return "Connecting to the signature device...";
		if (!padIsConnected)
			return "Unable to connect to the signature device. Please plug it in and try again.";
		return "Please provide your signature below.";
	};

	return (
		<main>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>DMS E-Signature Service</DialogTitle>
						<DialogDescription>{getDialogDescription()}</DialogDescription>
					</DialogHeader>
					<div className="flex h-96 items-center justify-center">
						{isLoading || padIsLoading ? (
							<div className="text-center">
								<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
								<p className="text-sm text-gray-500">
									{isLoading
										? "Establishing server connection..."
										: "Connecting to the signature device..."}
								</p>
							</div>
						) : isConnected ? (
							<SignatureCanvas
								padConnection={padIsConnected}
								onSave={handleSaveSignature}
								signatureImage={signatureImage}
								setSignatureImage={setSignatureImage}
								getSignature={getSignature}
								clearCanvas={clearCanvas}
								signature_confirm_send={signature_confirm_send}
								signature_retry_send={signature_retry_send}
								signature_cancel_send={signature_cancel_send}
								padType={padType}
								serialNumber={serialNumber}
								firmwareVersion={firmwareVersion}
								isImageCaptureSupported={isImageCaptureSupported}
								canvasRef={canvasRef}
							/>
						) : (
							<div className="text-center">
								<WifiOff className="mx-auto mb-4 h-16 w-16 text-red-500" />
								<p className="text-sm text-gray-500">
									{isConnected
										? "Signature device connection failed. Please try again."
										: "Server connection failed. Please check your connection and try again."}
								</p>
							</div>
						)}
					</div>
					<DialogFooter>
						{!isLoading && !padIsLoading && (!isConnected || !padIsConnected) && (
							<Button
								onClick={() => {
									reconnect();
									resetSignature();
								}}
							>
								Retry
							</Button>
						)}
						{!isLoading && !padIsLoading && (!isConnected || !padIsConnected) && (
							<Button onClick={() => setOpen(false)}>Close</Button>
						)}
						{isConnected && padIsConnected && (
							<div className="flex gap-2">
								{signature && (
									<div className="mt-2 flex items-center space-x-2">
										<CheckCircle2 className="h-5 w-5 text-green-500" />
										<span className="text-sm text-green-600">
											Signature submitted successfully!
										</span>
									</div>
								)}
							</div>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	);
}
