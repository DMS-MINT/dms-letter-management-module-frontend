import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	GitCommitHorizontal,
	Hash,
	Shield,
	Touchpad,
	WifiOff,
} from "lucide-react";
import Image from "next/image";

interface SignatureCanvasProps {
	padConnection: boolean;
	onSave: (signature: string) => void;
	signatureImage: string;
	setSignatureImage: (signature: string) => void;
	getSignature: () => void;
	clearCanvas: () => void;
	signature_confirm_send: () => void;
	signature_retry_send: () => void;
	signature_cancel_send: () => void;
	padType: string;
	serialNumber: string;
	firmwareVersion: string;
	isImageCaptureSupported: boolean;
	canvasRef: RefObject<HTMLCanvasElement>;
}

export function SignatureCanvas({
	padConnection,
	onSave,
	signatureImage,
	setSignatureImage,
	getSignature,
	clearCanvas,
	signature_confirm_send,
	signature_retry_send,
	signature_cancel_send,
	padType,
	serialNumber,
	firmwareVersion,
	isImageCaptureSupported,
	canvasRef,
}: SignatureCanvasProps) {
	//   const {
	//     canvasRef,
	//     getSignature,
	//     padType,
	//     serialNumber,
	//     firmwareVersion,
	//     signatureImage,
	//     setSignatureImage,
	//     isImageCaptureSupported,
	//     signature_confirm_send,
	//     signature_retry_send,
	//     signature_cancel_send,
	//     clearCanvas,
	//   } = useSignaturePad();

	const [saved, setSaved] = useState(false);

	const clear = () => {
		signature_cancel_send();
		clearCanvas();
		setSaved(false);
		setSignatureImage("");
		getSignature();
	};

	const retry = () => {
		signature_retry_send();
		clearCanvas();
		setSaved(false);
		setSignatureImage("");
		// getSignature();
	};
	const reopen = () => {
		getSignature();
	};

	const saveSignature = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const signatureData = canvas.toDataURL();
		// onSave(signatureData);
	};
	const handleSignatureConfirm = async () => {
		await signature_confirm_send();
		setSaved(true);
		onSave(signatureImage);
	};

	//   const handleSaveSignature = (signature: string) => {
	//     setSignatureImage(signature);
	//     setSaved(true);
	//   };

	return (
		<div className="flex h-full w-full flex-col items-center space-y-4">
			<div className="flex w-full items-center justify-between">
				<div className="flex space-x-2">
					<Button variant="outline" size={"sm"} onClick={clearCanvas}>
						<Shield className="h-4 w-4 text-green-500 " />
						<span className="hidden text-sm text-green-500 md:block">Connected</span>
					</Button>
					<Button variant="outline" size={"sm"} onClick={clearCanvas}>
						<Touchpad className="h-4 w-4 text-green-500" />
						<span className="hidden text-sm text-green-500 md:block">{padType}</span>
					</Button>
					<Button variant="outline" size={"sm"} onClick={clearCanvas}>
						<GitCommitHorizontal className="h-4 w-4 text-green-500" />
						<span className="hidden text-sm text-green-500 md:block">
							Version {firmwareVersion}
						</span>
					</Button>
					<Button variant="outline" size={"sm"} onClick={clearCanvas}>
						<Hash className="h-4 w-4 text-green-500" />
						<span className="hidden text-sm text-green-500 md:block">
							Serial {serialNumber}
						</span>
					</Button>
				</div>
			</div>
			{!saved && !signatureImage ? (
				<canvas
					ref={canvasRef}
					width="470"
					height="300"
					className="rounded-md border-2 border-primary"
				/>
			) : (
				<div className="h-80 w-full overflow-y-auto ">
					{isImageCaptureSupported && signatureImage && (
						<Image
							src={signatureImage}
							alt="Signature"
							width={470}
							height={300}
							className=" mx-auto border border-gray-300"
						/>
					)}
				</div>
			)}
			<div className="flex w-full justify-between space-x-2">
				<Button variant="outline" onClick={saved ? clear : retry}>
					{saved ? "Clear" : "Retry"}
				</Button>
				{!padConnection && (
					<Button variant="outline" onClick={() => reopen}>
						reopen
					</Button>
				)}
				<Button onClick={saved ? saveSignature : handleSignatureConfirm}>
					{saved ? "Save Signature" : "Submit Signature"}
				</Button>
			</div>
		</div>
	);
}
