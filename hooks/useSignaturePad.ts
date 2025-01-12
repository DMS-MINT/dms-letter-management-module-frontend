import {
	custom_text,
	DeviceCapabilities,
	docHash_type,
	DocHashes,
	DocHashesValues,
	encryption_cert,
	encryption_cert_only_when_empty,
	field_name,
	os,
	padIndex,
	padMode,
	PadModes,
	PadStates,
	PadTypes,
	supportsRSA,
} from "@/types/pad/PadTypes";
import type { STPadServerLibType } from "@/types/pad/STPadServerTypes";
import { useCallback, useRef, useState } from "react";

declare global {
	interface Window {
		STPadServerLib: STPadServerLibType;
	}
}

export function useSignaturePad() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [padType, setPadType] = useState<PadTypes>(PadTypes.SigmaUSB);
	const [serialNumber, setSerialNumber] = useState("");
	const [firmwareVersion, setFirmwareVersion] = useState("");
	const [signatureCert_0, setSignatureCert_0] = useState("");
	const [rsaSupport, setRsaSupport] = useState(false);
	const [signatureImage, setSignatureImage] = useState("");
	const [signData, setSignData] = useState("");
	const [rsaSignature, setRsaSignature] = useState("");
	const [biometryCertID, setBiometryCertID] = useState("");
	const [RSAScheme, setRSAScheme] = useState("");
	const [padState, setPadState] = useState<PadStates>(PadStates.Closed);
	const [canStoreEncryptKey, setCanStoreEncryptKey] = useState(false);

	// const [dialogType, setDialogType] = useState<DialogTypes>(
	//   DialogTypes.Signature
	// );
	const [scaleFactorX, setScaleFactorX] = useState(1.0);
	const [scaleFactorY, setScaleFactorY] = useState(1.0);
	const [sampleRate, setSampleRate] = useState(0);
	const [default_dochash, setDefault_DocHash] = useState("");

	const [isImageCaptureSupported, setIsImageCaptureSupported] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [isConnected, setIsConnected] = useState(false);

	const getSignature = useCallback(async () => {
		let supportsRSA = false;
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		// console.log("STPadServerLibDefault", STPadServerLibDefault);

		try {
			// Search for pads
			const padConnectionType = "HID";

			const searchForPadsParams =
				//eslint-disable-next-line @typescript-eslint/no-explicit-any
				new (STPadServerLibDefault.Params.searchForPads as any)();

			searchForPadsParams.setPadSubset(padConnectionType);
			const pads = await STPadServerLibDefault.searchForPads(searchForPadsParams);
			// console.log("pads", pads);
			// console.log("pads.foundPads", pads.foundPads);

			if (pads.foundPads.length === 0) {
				// alert("No connected pads have been found.");
				setIsConnected(false);
				setIsLoading(false);
				return;
			} else {
				setIsConnected(true);
				setIsLoading(false);
			}

			const padme = pads.foundPads[padIndex];
			setPadType(padme.type);
			setSerialNumber(padme.serialNumber);
			setFirmwareVersion(padme.firmwareVersion);

			if (pads.foundPads[padIndex].capabilities & DeviceCapabilities.SupportsRSA) {
				if (os == "Windows") {
					supportsRSA = true;
				} else if (os == "Linux") {
					// not supported
					supportsRSA = false;
				} else {
					// do nothing
				}
			} else {
				supportsRSA = false;
			}

			if (
				pads.foundPads[padIndex].capabilities &
				DeviceCapabilities.CanStoreEncryptKey
			) {
				if (os == "Windows") {
					setCanStoreEncryptKey(true);
				} else if (os == "Linux") {
					// not supported
					setCanStoreEncryptKey(false);
				} else {
					// do nothing
				}
			} else {
				setCanStoreEncryptKey(false);
			}
			if (supportsRSA) {
				setRsaSupport(true);
			} else {
				setRsaSupport(false);
			}
		} catch (error) {
			console.error("Error in getSignature:", error);
			// alert("An error occurred while getting the signature.");
			// Ensure pad is closed in case of error
			await default_close_pad();
			setIsConnected(false);
		} finally {
			setIsLoading(false);
		}

		// Open pad
		try {
			//eslint-disable-next-line @typescript-eslint/no-explicit-any
			const openPadParams = new (STPadServerLibDefault.Params.openPad as any)(
				padIndex
			);
			const padInfo = await STPadServerLibDefault.openPad(openPadParams);
			setPadState(PadStates.Opened);

			// const width = padInfo.padInfo.displayWidth;
			// const height = padInfo.padInfo.displayHeight;

			//get scale factor from signature resolution to canvas
			const scaleFactorX =
				padInfo.padInfo.displayWidth / padInfo.padInfo.xResolution;
			const scaleFactorY =
				padInfo.padInfo.displayHeight / padInfo.padInfo.yResolution;
			setScaleFactorX(scaleFactorX);
			setScaleFactorY(scaleFactorY);

			//get sample rate

			const sampleRate = padInfo.padInfo.samplingRate;
			setSampleRate(sampleRate);
			//start the signature process
			await signature_start();
			// Start signature - directly call the method
		} catch (error) {
			console.error("Error in getSignature:", error);
			// alert("An error occurred while getting the signature.");
			// Ensure pad is closed in case of error
			await default_close_pad();
			setIsConnected(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// signature start begin
	async function signature_start() {
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		// console.log("STPadServerLibDefault", STPadServerLibDefault);

		switch (docHash_type) {
			// case DocHashesValues.SHA1:
			//  setDefault_DocHash(DocHashes.SHA1)
			//   break;
			case DocHashesValues.SHA256:
				setDefault_DocHash(DocHashes.SHA256);
				break;
			default:
				// alert("unknown doc hash");
				return;
		}

		try {
			const startSignatureParams =
				//eslint-disable-next-line @typescript-eslint/no-explicit-any
				new (STPadServerLibDefault.Params.startSignature as any)();
			startSignatureParams.setFieldName(field_name);
			startSignatureParams.setCustomText(custom_text);
			if (supportsRSA) {
				if (canStoreEncryptKey) {
					startSignatureParams.enablePadEncryption(
						default_dochash,
						encryption_cert,
						encryption_cert_only_when_empty
					);
				} else {
					startSignatureParams.enablePadEncryption(default_dochash, null);
				}
			}
			await STPadServerLibDefault.startSignature(startSignatureParams);
		} catch (error) {
			console.error("Error in signature_start:", error);
			default_close_pad();
		}
	}
	// signature start end

	// close pad begin
	async function default_close_pad() {
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		// console.log("STPadServerLibDefault", STPadServerLibDefault);

		if (padState === PadStates.Opened) {
			//eslint-disable-next-line @typescript-eslint/no-explicit-any
			const closePadParams = new (STPadServerLibDefault.Params.closePad as any)(
				padIndex
			);
			await STPadServerLibDefault.closePad(closePadParams);
			setPadState(PadStates.Closed);
		}
	}

	const getReadableType = (intTypeNumber: PadTypes): string => {
		switch (intTypeNumber) {
			case PadTypes.SigmaUSB:
				return "Sigma USB";
			case PadTypes.SigmaSerial:
				return "Sigma serial";
			case PadTypes.ZetaUSB:
				return "Zeta USB";
			case PadTypes.ZetaSerial:
				return "Zeta serial";
			case PadTypes.OmegaUSB:
				return "Omega USB";
			case PadTypes.OmegaSerial:
				return "Omega serial";
			case PadTypes.GammaUSB:
				return "Gamma USB";
			case PadTypes.GammaSerial:
				return "Gamma serial";
			case PadTypes.DeltaUSB:
				return "Delta USB";
			case PadTypes.DeltaSerial:
				return "Delta serial";
			case PadTypes.DeltaIP:
				return "Delta IP";
			case PadTypes.AlphaUSB:
				return "Alpha USB";
			case PadTypes.AlphaSerial:
				return "Alpha serial";
			case PadTypes.AlphaIP:
				return "Alpha IP";
			default:
				return "Unknown";
		}
	};

	/**
	 * Draws a stroke start point into the canvas
	 */
	function drawStrokeStartPoint(
		canvasContext: CanvasRenderingContext2D,
		softCoordX: number,
		softCoordY: number
	) {
		// open new stroke's path
		canvasContext.beginPath();
		canvasContext.arc(softCoordX, softCoordY, 0.1, 0, 2 * Math.PI, true);
		canvasContext.fill();
		canvasContext.stroke();
		canvasContext.moveTo(softCoordX, softCoordY);
	}

	/**
	 * Draws a stroke point into the canvas
	 */
	function drawStrokePoint(
		canvasContext: CanvasRenderingContext2D,
		softCoordX: number,
		softCoordY: number
	) {
		// continue after start or not start point
		canvasContext.lineTo(softCoordX, softCoordY);
		canvasContext.stroke();
	}

	// Define handlers for STPadServerLibCommons and STPadServerLibDefault
	if (typeof window !== "undefined" && window.STPadServerLib) {
		const { STPadServerLibCommons, STPadServerLibDefault } =
			window.STPadServerLib;

		// The send events
		STPadServerLibCommons.handleDisconnect = function (index: number) {
			disconnect_send(index);
		};

		STPadServerLibCommons.handleNextSignaturePoint = function (
			x: number,
			y: number,
			p: number
		) {
			signature_point_send(x, y, p);
		};

		STPadServerLibDefault.handleRetrySignature = function () {
			signature_retry_send();
		};

		STPadServerLibDefault.handleConfirmSignature = function () {
			signature_confirm_send();
		};

		STPadServerLibDefault.handleCancelSignature = function () {
			signature_cancel_send();
		};

		STPadServerLibDefault.handleError = function (
			error_context: string,
			return_code: number,
			error_description: string
		) {
			error_send(error_context, return_code, error_description);
		};
	}

	// disconnect send begin
	function disconnect_send(index: number) {
		const msg = "The pad (index: " + index + ") has been disconnected.";
		// alert(msg);
		// console.log(msg);

		resetUserInterface();
		// setDialogType(DialogTypes.Signature);
		setPadState(PadStates.Closed);
	}
	// disconnect send end

	// signature point send begin

	function signature_point_send(x: number, y: number, p: number) {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "#0000FF"; // pen color blue
		ctx.lineWidth = 2.5;
		ctx.lineCap = "round";

		if (p === 0) {
			drawStrokeStartPoint(ctx, x * scaleFactorX, y * scaleFactorY);
		} else {
			drawStrokePoint(ctx, x * scaleFactorX, y * scaleFactorY);
		}
	}

	// signature retry send begin
	async function signature_retry_send() {
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		if (padMode == PadModes.Default) {
			// default mode
			try {
				await STPadServerLibDefault.retrySignature();
				const canvas = canvasRef.current;
				if (canvas) {
					const ctx = canvas.getContext("2d");
					if (ctx) {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					}
				}
			} catch (error) {
				// console.log("signature_retry_send error", error);
				default_close_pad();
			}
		} else {
			// alert("invalid padMode");
			// console.log("invalid padMode");
			return;
		}
	}

	async function signature_confirm_send() {
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		const rsa_scheme = STPadServerLibDefault.RsaScheme.PSS;

		if (padMode !== PadModes.Default) {
			// alert("Invalid padMode");
			// console.log("Invalid padMode");
			return;
		}

		try {
			const signature = await STPadServerLibDefault.confirmSignature();
			// console.log("Signature confirmed:", signature);

			if (signature.countedPoints / sampleRate <= 0.2) {
				alert("The signature is too short. Please sign again!");
				await STPadServerLibDefault.retrySignature();
				clearCanvas();
				return;
			}

			if (supportsRSA) {
				const signingCert = await STPadServerLibDefault.getSigningCert();
				setSignatureCert_0(signingCert.signingCert);
			} else {
				setSignatureCert_0("");
			}

			// Get signature image
			if (os === "Windows") {
				try {
					const getSignatureImageParams =
						//eslint-disable-next-line @typescript-eslint/no-explicit-any
						new (STPadServerLibDefault.Params.getSignatureImage as any)();
					getSignatureImageParams.setFileType(STPadServerLibDefault.FileType.PNG);
					getSignatureImageParams.setPenWidth(5);

					const signatureImage = await STPadServerLibDefault.getSignatureImage(
						getSignatureImageParams
					);
					// console.log("Signature image received:", signatureImage);

					if (signatureImage && signatureImage.file) {
						setSignatureImage("data:image/png;base64," + signatureImage.file);
					} else {
						console.error(
							"Signature image is undefined or doesn't contain file data"
						);
						setIsImageCaptureSupported(false);
					}
				} catch (error) {
					console.error("Error getting signature image:", error);
					setIsImageCaptureSupported(false);
				}
			} else {
				// console.log("Signature image capture not supported on this OS");
				setIsImageCaptureSupported(false);
			}

			// Get signature data
			try {
				const getSignatureDataParams =
					//eslint-disable-next-line @typescript-eslint/no-explicit-any
					new (STPadServerLibDefault.Params.getSignatureData as any)();

				getSignatureDataParams.setRsaScheme(rsa_scheme);
				const signatureData = await STPadServerLibDefault.getSignatureData(
					getSignatureDataParams
				);
				// console.log("Signature data received:", signatureData);

				if (supportsRSA) {
					if (signatureData.certId !== undefined) {
						setBiometryCertID(signatureData.certId);
					}
					setRSAScheme(rsa_scheme);
					if (signatureData.rsaSignature !== undefined) {
						setRsaSignature(signatureData.rsaSignature);
					}
				} else {
					setBiometryCertID("");
					setRSAScheme("");
					setRsaSignature("");
				}

				if (signatureData.signData !== undefined) {
					setSignData(signatureData.signData);
				}
			} catch (error) {
				console.error("Error getting signature data:", error);
			}
		} catch (error) {
			console.error("Error in signature_confirm_send:", error);
		} finally {
			await default_close_pad();
		}
	}

	function clearCanvas() {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	}

	// signature cancel send begin
	async function signature_cancel_send() {
		if (typeof window === "undefined" || !window.STPadServerLib) {
			console.error("STPadServerLib not loaded");
			return;
		}

		const { STPadServerLibDefault } = window.STPadServerLib;
		if (padMode == PadModes.Default) {
			// default mode
			try {
				await STPadServerLibDefault.cancelSignature();
				const canvas = canvasRef.current;
				if (canvas) {
					const ctx = canvas.getContext("2d");
					if (ctx) {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					}
				}
				default_close_pad();
			} catch (error) {
				// console.log("signature_cancel_send error", error);
				default_close_pad();
			}
		} else {
			// alert("invalid padMode");
			// console.log("invalid padMode");
			return;
		}
	}

	// error send begin
	function error_send(
		error_context: string,
		return_code: number,
		error_description: string
	) {
		const ret = return_code;
		if (ret < 0) {
			// alert(
			//   "Failed to confirm the signature. Reason: " +
			//     error_description +
			//     ", Context: " +
			//     error_context
			// );
			console.log(
				"Failed to confirm the signature. Reason: " +
					error_description +
					", Context: " +
					error_context
			);
		}
	}
	// error send end
	function resetUserInterface() {
		//reset the pads properties
		setPadType(PadTypes.SigmaUSB);
		setSerialNumber("");
		setFirmwareVersion("");
		setRsaSupport(false);
		setBiometryCertID("");
		setRSAScheme("");
		setSignatureCert_0("");

		//delete the previous signature
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
		setSignatureImage("");
		setSignData("");
		setRsaSignature("");
	}

	return {
		canvasRef,
		getSignature,
		padType: getReadableType(padType),
		biometryCertID: biometryCertID,
		RSAScheme: RSAScheme,
		signatureCert_0: signatureCert_0,
		serialNumber: serialNumber,
		firmwareVersion: firmwareVersion,
		rsaSupport: rsaSupport ? "Yes" : "No",
		setSignatureImage,
		signatureImage: signatureImage,
		signData: signData,
		rsaSignature: rsaSignature,
		isImageCaptureSupported,
		signature_confirm_send,
		signature_retry_send,
		signature_cancel_send,
		clearCanvas,
		isLoading,
		isConnected,
	};
}
