export interface STPadServerLibType {
	STPadServerLibCommons: {
		Params: {
			getServerVersion: () => { os: string }; // Update the return type here
			getInterfaceVersion: () => Promise<string>;
			setInterfaceVersion: (params: object) => Promise<void>;
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		batch: (params: object) => Promise<any>;
		createConnection: (
			url: string,
			onOpen: () => void,
			onClose: () => void,
			onError: (error: unknown) => void
		) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createPromise: (commandObject: object) => Promise<any>;
		destroyConnection: () => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		grabResult: (command: string, id: string) => any;
		handleDisconnect: (index: number) => void;
		handleLogging: (message: unknown) => void;
		handleNextSignaturePoint: (x: number, y: number, p: number) => void;
		pushResult: (resultObject: object) => void;
		send: (message: object) => void;
		getInterfaceVersion: () => Promise<string>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getSTPadServer: () => Promise<any>;
		getServerVersion: () => { os: string };
		setInterfaceVersion: (params: object) => Promise<void>;
	};

	STPadServerLibDefault: {
		FileType: {
			BMP: number;
			GIF: number;
			JPEG: number;
			PNG: number;
			TIFF: number;
		};
		FontStyle: {
			BOLD: string;
			ITALIC: string;
			UNDERLINE: string;
		};
		Params: {
			TOKEN_CMD: string;
			TOKEN_TYPE: string;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			searchForPads: () => Promise<any>;
			cancelSignature: () => Promise<void>;
			closePad: (index: number) => Promise<void>;
			confirmSignature: () => Promise<void>;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getSignatureData: () => Promise<any>;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getSignatureImage: (params: object) => Promise<any>;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getSigningCert: () => Promise<any>;
			startSelectionDialog: () => Promise<void>;
			stopSignature: () => Promise<void>;
			retrySignature: () => Promise<void>;
			setPadSubset: (padSubset: object) => Promise<void>;
			startSignature: (params: object) => Promise<void>;
			openPad: (index: number) => Promise<void>;
		};

		RsaScheme: {
			NoOID: string;
			None: string;
			PKCS1_V1_5: string;
			PSS: string;
		};
		cancelSignature: () => Promise<void>;
		closePad: (index: number) => Promise<void>;
		confirmSignature: () => Promise<{
			countedPoints: number;
			returnCode: number;
			tokenId: string;
			command: string;
		}>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getSignatureData: (params: object) => Promise<any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getSignatureImage: (params: object) => Promise<any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getSigningCert: () => Promise<any>;
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		openPad: (index: number) => Promise<any>;
		retrySignature: () => Promise<void>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		searchForPads: (params: object) => Promise<any>;
		setPadSubset: (padSubset: object) => Promise<void>;
		startSelectionDialog: () => Promise<void>;
		startSignature: (params: object) => Promise<void>;
		stopSignature: () => Promise<void>;
		handleCancelSelection: (message: string) => void;
		handleCancelSignature: (message: string) => void;
		handleConfirmSelection: (message: string) => void;
		handleConfirmSignature: (message: string) => void;
		handleResponse: (message: string, resultObject: object) => void;
		handleRetrySignature: (message: string) => void;
		handleSelectionChange: (message: string) => void;
		handleSendEvent: (message: string) => void;
		handleError: (
			error_context: string,
			return_code: number,
			error_description: string
		) => void;
	};

	STPadServerLibApi: {
		Device: {
			Params: object;
			setComPort: (port: string) => void;
			getConnectionType: () => string;
			getComPort: () => string;
			getIpAddress: () => string;
		};
		Display: {
			Params: object;
			erase: () => void;
			eraseRect: (params: object) => void;
			configPen: (params: object) => void;
			setFont: (params: object) => void;
		};
		EraseOption: Record<string, number>;
		FileType: Record<string, number>;
		HotSpotMode: Record<string, number>;
		HotSpotType: Record<string, number>;
		MeasurementUnit: Record<string, number>;
		Pdf: {
			Params: object;
			load: (params: object) => Promise<void>;
			getPageCount: () => number;
			getWidths: () => number[];
			getHeights: () => number[];
		};
		RSA: {
			Params: object;
			getEncryptionCertId: () => string;
			setEncryptionCertPw: (password: string) => void;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getRSASignData: (params: object) => Promise<any>;
			setHash: (hash: string) => void;
		};
		SampleRateMode: Record<string, number>;
		Sensor: {
			Params: object;
			handleHotSpotPressed: (params: object) => void;
			handleDisplayScrollPosChanged: (params: object) => void;
			getSampleRateMode: () => number;
			setSampleRateMode: (mode: number) => void;
		};
		Signature: {
			Params: object;
			getResolution: () => number;
			start: () => Promise<void>;
			stop: () => Promise<void>;
			confirm: () => Promise<void>;
		};
		TextAlignment: Record<string, number>;
		handleResponse: (message: unknown, resultObject: object) => void;
		handleSendEvent: (message: object) => void;
	};
}
