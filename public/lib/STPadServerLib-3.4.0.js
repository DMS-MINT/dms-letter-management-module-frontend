(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD
		define(["exports"], factory);
	} else if (typeof exports === "object" && typeof module === "object") {
		// CommonJS
		factory(exports);
	} else {
		// Globales Skript
		factory((root.STPadServerLib = {}));
	}
})(typeof self !== "undefined" ? self : this, function (exports) {
	let STPadServerLibCommons = {};
	(function (context) {
		let _onOpen = null;
		let _onClose = null;
		let _onError = null;
		let _stPadServer = null;
		let _resultValues = new Map();
		let _interfaceVersion = "1.0.0.0";
		let _requestedInterfaceVersion = "1.0.0.0";
		let _tokenCount = 0;

		const supportedInterfaceVersion = "3.4.0.0";
		const minTokenIdVersion = "3.4.0.0";

		const Strings = {
			TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",
			TOKEN_TYPE_RESPONSE: "TOKEN_TYPE_RESPONSE",
			TOKEN_TYPE_SEND: "TOKEN_TYPE_SEND",
			TOKEN_CMD_GET_SERVER_VERSION: "TOKEN_CMD_GET_SERVER_VERSION",
			TOKEN_CMD_GET_INTERFACE_VERSION: "TOKEN_CMD_GET_INTERFACE_VERSION",
			TOKEN_CMD_SET_INTERFACE_VERSION: "TOKEN_CMD_SET_INTERFACE_VERSION",
			TOKEN_CMD_BATCH: "TOKEN_CMD_BATCH",
			TOKEN_CMD_INCORRECT_COMMAND: "TOKEN_CMD_INCORRECT_COMMAND",
			TOKEN_ID: "TOKEN_ID",
		};

		context.handleLogging = function (message) {};
		context.handleNextSignaturePoint = function (message) {};
		context.handleDisconnect = function (message) {};

		context.Params = {
			getServerVersion: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_GET_SERVER_VERSION;
			},
			getInterfaceVersion: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_GET_INTERFACE_VERSION;
			},
			setInterfaceVersion: function (version) {
				if (version === undefined || version === null) {
					throw "Invalid value for mandatory parameter 'version'";
				}
				if (0 < compareVersions(version, supportedInterfaceVersion)) {
					throw "Target version " + version + " is too new";
				}
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SET_INTERFACE_VERSION;
				this.TOKEN_PARAM_VERSION = version;
				_requestedInterfaceVersion = version;
			},
		};

		// Functions
		context.batch = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};

		context.getServerVersion = async function () {
			return context.createPromise(new context.Params.getServerVersion());
		};

		context.getInterfaceVersion = async function () {
			return context.createPromise(new context.Params.getInterfaceVersion());
		};

		context.setInterfaceVersion = async function (params) {
			return context.createPromise(params);
		};

		context.createConnection = function (
			url,
			onOpenParam,
			onCloseParam,
			onErrorParam
		) {
			if (_stPadServer != null) {
				throw "WebSocket object is already created. Please call 'STPadServerLibCommons.destroyConnection()' first!";
			}
			_onOpen = onOpenParam;
			_onClose = onCloseParam;
			_onError = onErrorParam;

			_stPadServer = new WebSocket(url);
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.createConnection(): WebSocket successfully created"
			);
			_stPadServer.onopen = onOpen;
			_stPadServer.onerror = onErrorParam;
			_stPadServer.onmessage = onMessage;
		};

		context.destroyConnection = function () {
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.destroyConnection()"
			);
			if (_stPadServer != null) {
				_stPadServer.close();
			}
			_stPadServer = null;
		};

		context.getSTPadServer = function () {
			if (_stPadServer == null) {
				throw "STPadServer object is null. Please call 'STPadServerLibCommons.createConnection()' first!";
			}
			return _stPadServer;
		};

		context.send = function (message) {
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.send(): message = " + message
			);
			context.getSTPadServer().send(message);
		};

		async function onOpen(event) {
			STPadServerLibCommons.handleLogging("onOpen()");
			try {
				let version = await context.getServerVersion();

				if (compareVersions(version.serverVersion, supportedInterfaceVersion) > 0) {
					const params = new context.Params.setInterfaceVersion(
						supportedInterfaceVersion
					);
					await context.setInterfaceVersion(params);
				} else {
					await context.getInterfaceVersion();
				}

				_onOpen(event);
				_stPadServer.onopen = _onOpen;
				_stPadServer.onclose = _onClose;
			} catch (reason) {
				_stPadServer.onopen = null;
				_stPadServer.onclose = null;
				_stPadServer.onerror = null;
				_stPadServer.onmessage = null;

				context.destroyConnection();
				let error = new Event("error");
				error.details =
					"Function " + reason.command + " failed. Reason: " + reason.errorMessage;
				_onError(error);
			}
		}

		function onMessage(event) {
			STPadServerLibCommons.handleLogging(
				"onMessage(): event.data = " + event.data
			);
			try {
				const message = JSON.parse(event.data);
				if (Array.isArray(message)) {
					const results = [];
					let returnCode = 0;
					let errorMessage;
					for (let response of message) {
						const result = handleResponse(response);
						if (returnCode == 0 && result.returnCode < 0) {
							returnCode = result.returnCode;
							errorMessage = result.errorMessage;
						}
						results.push(result);
					}
					let resultObject = {
						command: Strings.TOKEN_CMD_BATCH,
						results: results,
						returnCode: returnCode,
					};
					if (returnCode < 0) {
						resultObject.errorCode = returnCode;
						resultObject.errorMessage = errorMessage;
					}
					if (results[0] && results[0].tokenId) {
						resultObject.tokenId = results[0].tokenId;
					}
					context.pushResult(resultObject);
				} else {
					switch (message.TOKEN_TYPE) {
						case Strings.TOKEN_TYPE_REQUEST:
							break;
						case Strings.TOKEN_TYPE_RESPONSE:
							context.pushResult(handleResponse(message));
							break;
						case Strings.TOKEN_TYPE_SEND:
							handleSendEvent(message);
							break;
						default:
							STPadServerLibCommons.handleLogging(
								"onMessage(): Invalid response: " + message
							);
					}
				}
			} catch (error) {
				console.error("Parsing error: event.data = " + event.data);
				throw error;
			}
		}

		function handleResponse(message) {
			let resultObject = { command: message.TOKEN_CMD_ORIGIN };
			if (handleResult(message, resultObject)) {
				switch (message.TOKEN_CMD_ORIGIN) {
					case Strings.TOKEN_CMD_GET_SERVER_VERSION:
						resultObject.serverVersion = message.TOKEN_PARAM_VERSION;
						resultObject.os = message.TOKEN_PARAM_OS;
						break;
					case Strings.TOKEN_CMD_GET_INTERFACE_VERSION:
						resultObject.interfaceVersion = message.TOKEN_PARAM_VERSION;
						_interfaceVersion = message.TOKEN_PARAM_VERSION;
						break;
					case Strings.TOKEN_CMD_SET_INTERFACE_VERSION:
						if (resultObject.returnCode >= 0) {
							_interfaceVersion = _requestedInterfaceVersion;
						}
						break;
					default:
						resultObject =
							STPadServerLibDefault.handleResponse(message, resultObject) ??
							STPadServerLibApi.handleResponse(message, resultObject);
						if (resultObject == null) {
							STPadServerLibCommons.handleLogging(
								"Invalid command token: " + resultObject.command
							);
						}
				}
			}
			return resultObject;
		}

		function handleResult(message, resultObject) {
			const messageReturnCode = message.TOKEN_PARAM_RETURN_CODE;
			let returnCode = 0;
			let handleResponse = true;
			if (typeof messageReturnCode == "string") {
				returnCode = parseInt(messageReturnCode);
				if (returnCode < 0) {
					handleResponse = false;
				}
			} else if (Array.isArray(messageReturnCode)) {
				for (const element of messageReturnCode) {
					returnCode = parseInt(element);
					if (returnCode < 0) {
						break;
					} else {
						returnCode = 0;
					}
				}
			} else {
				const error = "Invalid return code: " + messageReturnCode;
				STPadServerLibCommons.handleLogging(error);
				if (message.TOKEN_PARAM_ERROR_DESCRIPTION === undefined) {
					message.TOKEN_PARAM_ERROR_DESCRIPTION = error;
				}
				returnCode = Number.MIN_SAFE_INTEGER;
				handleResponse = false;
			}
			resultObject.returnCode = returnCode;
			if (returnCode < 0) {
				resultObject.errorMessage = message.TOKEN_PARAM_ERROR_DESCRIPTION;
				resultObject.errorCode = returnCode;
			}
			if (message.TOKEN_ID) {
				resultObject.tokenId = message.TOKEN_ID;
			}
			return handleResponse;
		}

		function handleSendEvent(data) {
			if (data.TOKEN_CMD == Strings.TOKEN_CMD_INCORRECT_COMMAND) {
				console.error(data.TOKEN_PARAM_EXCEPTION_CAUSE);
			} else {
				const defaultResult = STPadServerLibDefault.handleSendEvent(data);
				if (defaultResult == null) {
					STPadServerLibApi.handleSendEvent(data);
				}
			}
		}

		context.pushResult = function (resultObject) {
			let key = resultObject.tokenId;
			if (key == undefined) {
				const keyPrefix = resultObject.command + "_";
				let i = 0;
				key = keyPrefix + i;
				let result = _resultValues[key];
				while (result != undefined) {
					i++;
					if (i > 50) {
						STPadServerLibCommons.handleLogging(
							"STPadServerLibCommons.pushResult(): " +
								JSON.stringify(resultObject) +
								" could not be pushed. Too many unresolved requests"
						);
						return;
					}
					key = keyPrefix + i;
					result = _resultValues[key];
				}
			}
			_resultValues[key] = resultObject;
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.pushResult() pushed " +
					JSON.stringify(resultObject) +
					" at key " +
					key
			);
		};

		context.grabResult = function (command, id) {
			const keyPrefix = command + "_";
			let key = keyPrefix;
			if (id != undefined) {
				key += id;
			} else {
				key += "0";
			}
			let result = _resultValues[key];
			if (result == undefined) {
				if (id != undefined) {
					return null;
				} else {
					let i = 1;
					do {
						key = keyPrefix + i;
						result = _resultValues[key];
						i++;
						if (i > 50) {
							return null;
						}
					} while (result == undefined);
				}
			}
			delete _resultValues[key];
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.grabResult() grabbed " +
					JSON.stringify(result) +
					" from key " +
					key
			);
			return result;
		};

		context.createPromise = async function (commandObject) {
			let tokenCount;
			if (compareVersions(_interfaceVersion, minTokenIdVersion) >= 0) {
				tokenCount = _tokenCount++;
				const tokenIdSuffix = "_" + tokenCount;
				if (Array.isArray(commandObject)) {
					const tokenId = Strings.TOKEN_CMD_BATCH + tokenIdSuffix;
					commandObject.forEach((e) => (e[Strings.TOKEN_ID] = tokenId));
				} else {
					commandObject[Strings.TOKEN_ID] = commandObject.TOKEN_CMD + tokenIdSuffix;
				}
			}
			STPadServerLibCommons.send(JSON.stringify(commandObject));
			let command = Strings.TOKEN_CMD_BATCH;
			if (commandObject.TOKEN_CMD) {
				command = commandObject.TOKEN_CMD;
			}
			STPadServerLibCommons.handleLogging(
				"STPadServerLibCommons.createPromise(): command = " + command
			);
			return new Promise(function (resolve, reject) {
				(function wait() {
					const result = context.grabResult(command, tokenCount);
					if (result != null) {
						if (0 <= result.returnCode) {
							STPadServerLibCommons.handleLogging(
								"STPadServerLibCommons.createPromise() calls resolve(" +
									JSON.stringify(result) +
									")"
							);
							return resolve(result);
						} else {
							STPadServerLibCommons.handleLogging(
								"STPadServerLibCommons.createPromise() calls reject(" +
									JSON.stringify(result) +
									")"
							);
							return reject(result);
						}
					}
					setTimeout(wait, 1);
				})();
			});
		};

		function compareVersions(v1, v2) {
			let v1parts = v1.split(".");
			let v2parts = v2.split(".");
			while (v1parts.length < v2parts.length) {
				v1parts.push("0");
			}
			while (v2parts.length < v1parts.length) {
				v2parts.push("0");
			}
			for (let i = 0; i < v1parts.length; i++) {
				const v1Number = parseInt(v1parts[i]);
				const v2Number = parseInt(v2parts[i]);
				if (v1Number == v2Number) {
					continue;
				} else {
					if (v1Number < v2Number) {
						return -1;
					} else {
						return 1;
					}
				}
			}
			return 0;
		}
	})(STPadServerLibCommons);

	const STPadServerLibApi = {};
	(function (context) {
		// const (enums)
		context.SampleRateMode = {
			_125Hz: 0,
			_250Hz: 1,
			_500Hz: 2,
			_280Hz: 3,
		};

		context.TextAlignment = {
			LEFT: 0,
			CENTER: 1,
			RIGHT: 2,
			LEFT_CENTERED_VERTICALLY: 3,
			CENTER_CENTERED_VERTICALLY: 4,
			RIGHT_CENTERED_VERTICALLY: 5,
			LEFT_NO_WRAP: 6,
			CENTER_NO_WRAP: 7,
			RIGHT_NO_WRAP: 8,
		};

		context.HotSpotMode = {
			INACTIVE: 0,
			ACTIVE: 1,
			INVERT_OFF: 2,
		};

		context.FileType = {
			TIFF: 0,
			PNG: 1,
			BMP: 2,
			JPEG: 3,
			GIF: 4,
		};

		context.HotSpotType = {
			SCROLL_DOWN: 0,
			SCROLL_UP: 1,
			SCROLL_RIGHT: 2,
			SCROLL_LEFT: 3,
			SCROLL_SCROLLABLE: 4,
		};

		context.EraseOption = {
			COMPLETE: 0,
			SIGNATURE: 1,
		};

		context.MeasurementUnit = {
			PIXELS: 0,
			MILLIMETRES: 1,
			INCHES: 2,
		};

		const Strings = {
			TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",

			// Device
			TOKEN_CMD_API_DEVICE_SET_COM_PORT: "TOKEN_CMD_API_DEVICE_SET_COM_PORT",
			TOKEN_CMD_API_DEVICE_GET_CONNECTION_TYPE:
				"TOKEN_CMD_API_DEVICE_GET_CONNECTION_TYPE",
			TOKEN_CMD_API_DEVICE_GET_COM_PORT: "TOKEN_CMD_API_DEVICE_GET_COM_PORT",
			TOKEN_CMD_API_DEVICE_GET_IP_ADDRESS: "TOKEN_CMD_API_DEVICE_GET_IP_ADDRESS",
			TOKEN_CMD_API_DEVICE_GET_COUNT: "TOKEN_CMD_API_DEVICE_GET_COUNT",
			TOKEN_CMD_API_DEVICE_GET_INFO: "TOKEN_CMD_API_DEVICE_GET_INFO",
			TOKEN_CMD_API_DEVICE_GET_VERSION: "TOKEN_CMD_API_DEVICE_GET_VERSION",
			TOKEN_CMD_API_DEVICE_OPEN: "TOKEN_CMD_API_DEVICE_OPEN",
			TOKEN_CMD_API_DEVICE_CLOSE: "TOKEN_CMD_API_DEVICE_CLOSE",
			TOKEN_CMD_API_DEVICE_GET_CAPABILITIES:
				"TOKEN_CMD_API_DEVICE_GET_CAPABILITIES",

			// Sensor
			TOKEN_CMD_API_SENSOR_GET_SAMPLE_RATE_MODE:
				"TOKEN_CMD_API_SENSOR_GET_SAMPLE_RATE_MODE",
			TOKEN_CMD_API_SENSOR_SET_SAMPLE_RATE_MODE:
				"TOKEN_CMD_API_SENSOR_SET_SAMPLE_RATE_MODE",
			TOKEN_CMD_API_SENSOR_SET_SIGN_RECT: "TOKEN_CMD_API_SENSOR_SET_SIGN_RECT",
			TOKEN_CMD_API_SENSOR_CLEAR_SIGN_RECT: "TOKEN_CMD_API_SENSOR_CLEAR_SIGN_RECT",
			TOKEN_CMD_API_SENSOR_SET_SCROLL_AREA: "TOKEN_CMD_API_SENSOR_SET_SCROLL_AREA",
			TOKEN_CMD_API_SENSOR_SET_PEN_SCROLLING_ENABLED:
				"TOKEN_CMD_API_SENSOR_SET_PEN_SCROLLING_ENABLED",
			TOKEN_CMD_API_SENSOR_ADD_HOT_SPOT: "TOKEN_CMD_API_SENSOR_ADD_HOT_SPOT",
			TOKEN_CMD_API_SENSOR_ADD_SCROLL_HOT_SPOT:
				"TOKEN_CMD_API_SENSOR_ADD_SCROLL_HOT_SPOT",
			TOKEN_CMD_API_SENSOR_SET_HOT_SPOT_MODE:
				"TOKEN_CMD_API_SENSOR_SET_HOT_SPOT_MODE",
			TOKEN_CMD_API_SENSOR_CLEAR_HOT_SPOTS: "TOKEN_CMD_API_SENSOR_CLEAR_HOT_SPOTS",
			TOKEN_CMD_API_SENSOR_HOT_SPOT_PRESSED:
				"TOKEN_CMD_API_SENSOR_HOT_SPOT_PRESSED",

			// Signature
			TOKEN_CMD_API_SIGNATURE_GET_RESOLUTION:
				"TOKEN_CMD_API_SIGNATURE_GET_RESOLUTION",
			TOKEN_CMD_API_SIGNATURE_START: "TOKEN_CMD_API_SIGNATURE_START",
			TOKEN_CMD_API_SIGNATURE_STOP: "TOKEN_CMD_API_SIGNATURE_STOP",
			TOKEN_CMD_API_SIGNATURE_CONFIRM: "TOKEN_CMD_API_SIGNATURE_CONFIRM",
			TOKEN_CMD_API_SIGNATURE_RETRY: "TOKEN_CMD_API_SIGNATURE_RETRY",
			TOKEN_CMD_API_SIGNATURE_CANCEL: "TOKEN_CMD_API_SIGNATURE_CANCEL",
			TOKEN_CMD_API_SIGNATURE_GET_SIGN_DATA:
				"TOKEN_CMD_API_SIGNATURE_GET_SIGN_DATA",
			TOKEN_CMD_API_SIGNATURE_SAVE_AS_STREAM_EX:
				"TOKEN_CMD_API_SIGNATURE_SAVE_AS_STREAM_EX",
			TOKEN_CMD_API_SIGNATURE_GET_BOUNDS: "TOKEN_CMD_API_SIGNATURE_GET_BOUNDS",
			TOKEN_CMD_API_SIGNATURE_GET_STATE: "TOKEN_CMD_API_SIGNATURE_GET_STATE",
			// workaround for STPadServer < 1.6.0.0
			TOKEN_CMD_SIGNATURE_SIGN_DATA: "TOKEN_CMD_SIGNATURE_SIGN_DATA",

			// Display
			TOKEN_CMD_API_DISPLAY_ERASE: "TOKEN_CMD_API_DISPLAY_ERASE",
			TOKEN_CMD_API_DISPLAY_ERASE_RECT: "TOKEN_CMD_API_DISPLAY_ERASE_RECT",
			TOKEN_CMD_API_DISPLAY_CONFIG_PEN: "TOKEN_CMD_API_DISPLAY_CONFIG_PEN",
			TOKEN_CMD_API_DISPLAY_SET_FONT: "TOKEN_CMD_API_DISPLAY_SET_FONT",
			TOKEN_CMD_API_DISPLAY_SET_FONT_COLOR: "TOKEN_CMD_API_DISPLAY_SET_FONT_COLOR",
			TOKEN_CMD_API_DISPLAY_SET_TARGET: "TOKEN_CMD_API_DISPLAY_SET_TARGET",
			TOKEN_CMD_API_DISPLAY_SET_TEXT: "TOKEN_CMD_API_DISPLAY_SET_TEXT",
			TOKEN_CMD_API_DISPLAY_SET_TEXT_IN_RECT:
				"TOKEN_CMD_API_DISPLAY_SET_TEXT_IN_RECT",
			TOKEN_CMD_API_DISPLAY_SET_IMAGE: "TOKEN_CMD_API_DISPLAY_SET_IMAGE",
			TOKEN_CMD_API_DISPLAY_SET_IMAGE_FROM_STORE:
				"TOKEN_CMD_API_DISPLAY_SET_IMAGE_FROM_STORE",
			TOKEN_CMD_API_DISPLAY_SET_OVERLAY_RECT:
				"TOKEN_CMD_API_DISPLAY_SET_OVERLAY_RECT",
			TOKEN_CMD_API_DISPLAY_SET_SCROLL_POS: "TOKEN_CMD_API_DISPLAY_SET_SCROLL_POS",
			TOKEN_CMD_API_DISPLAY_GET_SCROLL_POS: "TOKEN_CMD_API_DISPLAY_GET_SCROLL_POS",
			TOKEN_CMD_API_DISPLAY_SAVE_IMAGE_AS_STREAM:
				"TOKEN_CMD_API_DISPLAY_SAVE_IMAGE_AS_STREAM",
			TOKEN_CMD_API_DISPLAY_SET_STANDBY_IMAGE:
				"TOKEN_CMD_API_DISPLAY_SET_STANDBY_IMAGE",
			TOKEN_CMD_API_DISPLAY_CONFIG_SLIDE_SHOW_EX:
				"TOKEN_CMD_API_DISPLAY_CONFIG_SLIDE_SHOW_EX",
			TOKEN_CMD_API_DISPLAY_GET_STANDBY_ID: "TOKEN_CMD_API_DISPLAY_GET_STANDBY_ID",
			TOKEN_CMD_API_DISPLAY_GET_WIDTH: "TOKEN_CMD_API_DISPLAY_GET_WIDTH",
			TOKEN_CMD_API_DISPLAY_GET_HEIGHT: "TOKEN_CMD_API_DISPLAY_GET_HEIGHT",
			TOKEN_CMD_API_DISPLAY_GET_TARGET_WIDTH:
				"TOKEN_CMD_API_DISPLAY_GET_TARGET_WIDTH",
			TOKEN_CMD_API_DISPLAY_GET_TARGET_HEIGHT:
				"TOKEN_CMD_API_DISPLAY_GET_TARGET_HEIGHT",
			TOKEN_CMD_API_DISPLAY_GET_SCROLL_SPEED:
				"TOKEN_CMD_API_DISPLAY_GET_SCROLL_SPEED",
			TOKEN_CMD_API_DISPLAY_SET_SCROLL_SPEED:
				"TOKEN_CMD_API_DISPLAY_SET_SCROLL_SPEED",
			TOKEN_CMD_API_DISPLAY_GET_ROTATION: "TOKEN_CMD_API_DISPLAY_GET_ROTATION",
			TOKEN_CMD_API_DISPLAY_SET_ROTATION: "TOKEN_CMD_API_DISPLAY_SET_ROTATION",
			TOKEN_CMD_API_DISPLAY_SCROLL_POS_CHANGED:
				"TOKEN_CMD_API_DISPLAY_SCROLL_POS_CHANGED",
			TOKEN_CMD_API_DISPLAY_GET_RESOLUTION: "TOKEN_CMD_API_DISPLAY_GET_RESOLUTION",
			TOKEN_CMD_API_DISPLAY_SET_PDF: "TOKEN_CMD_API_DISPLAY_SET_PDF",

			// Pdf
			TOKEN_CMD_API_PDF_LOAD: "TOKEN_CMD_API_PDF_LOAD",
			TOKEN_CMD_API_PDF_GET_PAGE_COUNT: "TOKEN_CMD_API_PDF_GET_PAGE_COUNT",
			TOKEN_CMD_API_PDF_GET_WIDTH: "TOKEN_CMD_API_PDF_GET_WIDTH",
			TOKEN_CMD_API_PDF_GET_HEIGHT: "TOKEN_CMD_API_PDF_GET_HEIGHT",
			TOKEN_CMD_API_PDF_SELECT_RECT: "TOKEN_CMD_API_PDF_SELECT_RECT",
			TOKEN_CMD_API_PDF_ADD_IMAGE: "TOKEN_CMD_API_PDF_ADD_IMAGE",
			TOKEN_CMD_API_PDF_REMOVE_IMAGE: "TOKEN_CMD_API_PDF_REMOVE_IMAGE",

			// RSA
			TOKEN_CMD_API_RSA_GET_ENCRYPTION_CERT_ID:
				"TOKEN_CMD_API_RSA_GET_ENCRYPTION_CERT_ID",
			TOKEN_CMD_API_RSA_SET_ENCRYPTION_CERT_PW:
				"TOKEN_CMD_API_RSA_SET_ENCRYPTION_CERT_PW",
			TOKEN_CMD_API_RSA_GET_SIGN_DATA: "TOKEN_CMD_API_RSA_GET_SIGN_DATA",
			TOKEN_CMD_API_RSA_SET_HASH: "TOKEN_CMD_API_RSA_SET_HASH",
			TOKEN_CMD_API_RSA_SIGN_PW: "TOKEN_CMD_API_RSA_SIGN_PW",
			TOKEN_CMD_API_RSA_SAVE_SIGNING_CERT_AS_STREAM:
				"TOKEN_CMD_API_RSA_SAVE_SIGNING_CERT_AS_STREAM",

			// Events
			TOKEN_CMD_DISCONNECT: "TOKEN_CMD_DISCONNECT",
			TOKEN_CMD_SIGNATURE_POINT: "TOKEN_CMD_SIGNATURE_POINT",
		};

		// Device
		context.Device = {
			Params: {
				setComPort: function (portList) {
					if (portList === undefined || portList === null) {
						throw "Invalid value for mandatory parameter 'portList'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_SET_COM_PORT;
					this.TOKEN_PARAM_PORT_LIST = portList;
				},
				getConnectionType: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_CONNECTION_TYPE;
					this.TOKEN_PARAM_INDEX = index;
				},
				getComPort: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_COM_PORT;
					this.TOKEN_PARAM_INDEX = index;
				},
				getIpAddress: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_IP_ADDRESS;
					this.TOKEN_PARAM_INDEX = index;
				},
				getCount: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_COUNT;
				},
				getInfo: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_INFO;
					this.TOKEN_PARAM_INDEX = index;
				},
				getVersion: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_VERSION;
					this.TOKEN_PARAM_INDEX = index;
				},
				open: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_OPEN;
					this.TOKEN_PARAM_INDEX = index;

					this.setEraseDisplay = function (eraseDisplay) {
						if (eraseDisplay === undefined || eraseDisplay === null) {
							throw "'eraseDisplay' is undefined or null";
						}
						this.TOKEN_PARAM_ERASE_DISPLAY = eraseDisplay;
					};
				},
				close: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_CLOSE;
					this.TOKEN_PARAM_INDEX = index;
				},
				getCapabilities: function (index) {
					if (index === undefined || index === null) {
						throw "Invalid value for mandatory parameter 'index'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DEVICE_GET_CAPABILITIES;
					this.TOKEN_PARAM_INDEX = index;
				},
			},

			// Device functions
			setComPort: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getConnectionType: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getComPort: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getIpAddress: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getCount: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Device.Params.getCount()
				);
			},
			getInfo: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getVersion: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			open: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			close: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getCapabilities: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
		};

		// Sensor
		context.Sensor = {
			handleHotSpotPressed: function (message) {},
			handleDisplayScrollPosChanged: function (message) {},

			Params: {
				getSampleRateMode: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_GET_SAMPLE_RATE_MODE;
				},
				setSampleRateMode: function (mode) {
					if (mode === undefined || mode === null) {
						throw "Invalid value for mandatory parameter 'mode'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_SET_SAMPLE_RATE_MODE;
					this.TOKEN_PARAM_MODE = mode;
				},
				setSignRect: function (left, top, width, height) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_SET_SIGN_RECT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
				},
				clearSignRect: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_CLEAR_SIGN_RECT;
				},
				setScrollArea: function (left, top, width, height) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_SET_SCROLL_AREA;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
				},
				setPenScrollingEnabled: function (enabled) {
					if (enabled === undefined || enabled === null) {
						throw "Invalid value for mandatory parameter 'enabled'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_SET_PEN_SCROLLING_ENABLED;
					this.TOKEN_PARAM_ENABLE = enabled;
				},
				addHotSpot: function (left, top, width, height) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_ADD_HOT_SPOT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
				},
				addScrollHotSpot: function (left, top, width, height, type) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					if (type === undefined || type === null) {
						throw "Invalid value for mandatory parameter 'type'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_ADD_SCROLL_HOT_SPOT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
					this.TOKEN_PARAM_TYPE = type;
				},
				setHotSpotMode: function (hotSpotId, mode) {
					if (hotSpotId === undefined || hotSpotId === null) {
						throw "Invalid value for mandatory parameter 'hotSpotId'";
					}
					if (mode === undefined || mode === null) {
						throw "Invalid value for mandatory parameter 'mode'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_SET_HOT_SPOT_MODE;
					this.TOKEN_PARAM_HOTSPOT_ID = hotSpotId;
					this.TOKEN_PARAM_MODE = mode;
				},
				clearHotSpots: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SENSOR_CLEAR_HOT_SPOTS;
				},
			},

			// Sensor functions
			getSampleRateMode: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Sensor.Params.getSampleRateMode()
				);
			},
			setSampleRateMode: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setSignRect: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			clearSignRect: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Sensor.Params.clearSignRect()
				);
			},
			setScrollArea: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setPenScrollingEnabled: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			addHotSpot: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			addScrollHotSpot: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setHotSpotMode: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			clearHotSpots: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Sensor.Params.clearHotSpots()
				);
			},
		};

		// Signature
		context.Signature = {
			Params: {
				getResolution: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_GET_RESOLUTION;
				},
				start: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_START;
				},
				stop: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_STOP;
				},
				confirm: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_CONFIRM;
				},
				retry: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_RETRY;
				},
				cancel: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_CANCEL;

					this.setErase = function (erase) {
						if (erase === undefined || erase === null) {
							throw "'erase' is undefined or null";
						}
						this.TOKEN_PARAM_ERASE = erase;
					};
				},
				getSignData: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_GET_SIGN_DATA;
				},
				saveAsStreamEx: function (
					resolution,
					width,
					height,
					fileType,
					penWidth,
					penColor,
					options
				) {
					if (resolution === undefined || resolution === null) {
						throw "Invalid value for mandatory parameter 'resolution'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					if (fileType === undefined || fileType === null) {
						throw "Invalid value for mandatory parameter 'fileType'";
					}
					if (penWidth === undefined || penWidth === null) {
						throw "Invalid value for mandatory parameter 'penWidth'";
					}
					if (penColor === undefined || penColor === null) {
						throw "Invalid value for mandatory parameter 'penColor'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_SAVE_AS_STREAM_EX;
					this.TOKEN_PARAM_RESOLUTION = resolution;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
					this.TOKEN_PARAM_FILE_TYPE = fileType;
					this.TOKEN_PARAM_PEN_WIDTH = penWidth;
					this.TOKEN_PARAM_PEN_COLOR = penColor;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				getBounds: function (options) {
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_GET_BOUNDS;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				getState: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_SIGNATURE_GET_STATE;
				},
			},

			// Signature functions
			getResolution: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.getResolution()
				);
			},
			start: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.start()
				);
			},
			stop: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.stop()
				);
			},
			confirm: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.confirm()
				);
			},
			retry: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.retry()
				);
			},
			cancel: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getSignData: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.getSignData()
				);
			},
			saveAsStreamEx: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getBounds: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getState: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Signature.Params.getState()
				);
			},
		};

		// Display
		context.Display = {
			Params: {
				erase: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_ERASE;
				},
				eraseRect: function (left, top, width, height) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_ERASE_RECT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
				},
				configPen: function (width, color) {
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (color === undefined || color === null) {
						throw "Invalid value for mandatory parameter 'color'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_CONFIG_PEN;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_PEN_COLOR = color;
				},
				setFont: function (name, size, options) {
					if (name === undefined || name === null) {
						throw "Invalid value for mandatory parameter 'name'";
					}
					if (size === undefined || size === null) {
						throw "Invalid value for mandatory parameter 'size'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_FONT;
					this.TOKEN_PARAM_NAME = name;
					this.TOKEN_PARAM_SIZE = size;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				setFontColor: function (color) {
					if (color === undefined || color === null) {
						throw "Invalid value for mandatory parameter 'color'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_FONT_COLOR;
					this.TOKEN_PARAM_FONT_COLOR = color;
				},
				setTarget: function (target) {
					if (target === undefined || target === null) {
						throw "Invalid value for mandatory parameter 'target'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_TARGET;
					this.TOKEN_PARAM_TARGET = target;
				},
				setText: function (xPos, yPos, alignment, text) {
					if (xPos === undefined || xPos === null) {
						throw "Invalid value for mandatory parameter 'xPos'";
					}
					if (yPos === undefined || yPos === null) {
						throw "Invalid value for mandatory parameter 'yPos'";
					}
					if (alignment === undefined || alignment === null) {
						throw "Invalid value for mandatory parameter 'alignment'";
					}
					if (text === undefined || text === null) {
						throw "Invalid value for mandatory parameter 'text'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_TEXT;
					this.TOKEN_PARAM_X_POS = xPos;
					this.TOKEN_PARAM_Y_POS = yPos;
					this.TOKEN_PARAM_ALIGNMENT = alignment;
					this.TOKEN_PARAM_TEXT = text;
				},
				setTextInRect: function (
					left,
					top,
					width,
					height,
					alignment,
					text,
					options
				) {
					if (text === undefined || text === null) {
						throw "Invalid value for mandatory parameter 'text'";
					}
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					if (alignment === undefined || alignment === null) {
						throw "Invalid value for mandatory parameter 'alignment'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_TEXT_IN_RECT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
					this.TOKEN_PARAM_ALIGNMENT = alignment;
					this.TOKEN_PARAM_TEXT = text;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				setImage: function (xPos, yPos, bitmap) {
					if (xPos === undefined || xPos === null) {
						throw "Invalid value for mandatory parameter 'xPos'";
					}
					if (yPos === undefined || yPos === null) {
						throw "Invalid value for mandatory parameter 'yPos'";
					}
					if (bitmap === undefined || bitmap === null) {
						throw "Invalid value for mandatory parameter 'bitmap'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_IMAGE;
					this.TOKEN_PARAM_X_POS = xPos;
					this.TOKEN_PARAM_Y_POS = yPos;
					this.TOKEN_PARAM_BITMAP = bitmap;
				},
				setImageFromStore: function (storeId) {
					if (storeId === undefined || storeId === null) {
						throw "Invalid value for mandatory parameter 'storeId'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_IMAGE_FROM_STORE;
					this.TOKEN_PARAM_STORE_ID = storeId;
				},
				setOverlayRect: function (left, top, width, height) {
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_OVERLAY_RECT;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
				},
				setScrollPos: function (xPos, yPos) {
					if (xPos === undefined || xPos === null) {
						throw "Invalid value for mandatory parameter 'xPos'";
					}
					if (yPos === undefined || yPos === null) {
						throw "Invalid value for mandatory parameter 'yPos'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_SCROLL_POS;
					this.TOKEN_PARAM_X_POS = xPos;
					this.TOKEN_PARAM_Y_POS = yPos;
				},
				getScrollPos: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_SCROLL_POS;
				},
				saveImageAsStream: function (fileType, options) {
					if (fileType === undefined || fileType === null) {
						throw "Invalid value for mandatory parameter 'fileType'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SAVE_IMAGE_AS_STREAM;
					this.TOKEN_PARAM_FILE_TYPE = fileType;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				setStandbyImage: function (bitmap) {
					if (bitmap === undefined || bitmap === null) {
						throw "Invalid value for mandatory parameter 'bitmap'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_STANDBY_IMAGE;
					this.TOKEN_PARAM_BITMAP = bitmap;
				},
				configSlideShowEx: function (slideList, durationList) {
					if (slideList === undefined || slideList === null) {
						throw "Invalid value for mandatory parameter 'slideList'";
					}
					if (durationList === undefined || durationList === null) {
						throw "Invalid value for mandatory parameter 'durationList'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_CONFIG_SLIDE_SHOW_EX;
					this.TOKEN_PARAM_SLIDE_LIST = slideList;
					this.TOKEN_PARAM_DURATION_LIST = durationList;
				},
				getStandbyId: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_STANDBY_ID;
				},
				getWidth: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_WIDTH;
				},
				getHeight: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_HEIGHT;
				},
				getTargetWidth: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_TARGET_WIDTH;
				},
				getTargetHeight: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_TARGET_HEIGHT;
				},
				getScrollSpeed: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_SCROLL_SPEED;
				},
				setScrollSpeed: function (speed) {
					if (speed === undefined || speed === null) {
						throw "Invalid value for mandatory parameter 'speed'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_SCROLL_SPEED;
					this.TOKEN_PARAM_SPEED = speed;
				},
				getRotation: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_ROTATION;
				},
				setRotation: function (rotation) {
					if (rotation === undefined || rotation === null) {
						throw "Invalid value for mandatory parameter 'rotation'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_ROTATION;
					this.TOKEN_PARAM_ROTATION = rotation;
				},
				getResolution: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_GET_RESOLUTION;
				},
				setPDF: function (xPoss, yPoss, pages, scale, options) {
					if (xPoss === undefined || xPoss === null) {
						throw "Invalid value for mandatory parameter 'xPoss'";
					}
					if (yPoss === undefined || yPoss === null) {
						throw "Invalid value for mandatory parameter 'yPoss'";
					}
					if (pages === undefined || pages === null) {
						throw "Invalid value for mandatory parameter 'pages'";
					}
					if (scale === undefined || scale === null) {
						throw "Invalid value for mandatory parameter 'scale'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_DISPLAY_SET_PDF;
					this.TOKEN_PARAM_X_POS = xPoss;
					this.TOKEN_PARAM_Y_POS = yPoss;
					this.TOKEN_PARAM_PAGE = pages;
					this.TOKEN_PARAM_SCALE = scale;
					this.TOKEN_PARAM_OPTIONS = options;
				},
			},

			// Display Functions
			erase: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.erase()
				);
			},
			eraseRect: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			configPen: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setFont: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setFontColor: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setTarget: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setText: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setTextInRect: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setImage: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setImageFromStore: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setOverlayRect: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setScrollPos: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getScrollPos: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getScrollPos()
				);
			},
			saveImageAsStream: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setStandbyImage: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			configSlideShowEx: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getStandbyId: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getStandbyId()
				);
			},
			getWidth: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getWidth()
				);
			},
			getHeight: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getHeight()
				);
			},
			getTargetWidth: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getTargetWidth()
				);
			},
			getTargetHeight: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getTargetHeight()
				);
			},
			getScrollSpeed: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getScrollSpeed()
				);
			},
			setScrollSpeed: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getRotation: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getRotation()
				);
			},
			setRotation: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getResolution: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Display.Params.getResolution()
				);
			},
			setPDF: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
		};

		// Pdf
		context.Pdf = {
			Params: {
				load: function (document) {
					if (document === undefined || document === null) {
						throw "Invalid value for mandatory parameter 'document'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_LOAD;
					this.TOKEN_PARAM_DOCUMENT = document;

					this.setPassword = function (password) {
						if (password === undefined || password === null) {
							throw "'password' is undefined or null";
						}
						this.TOKEN_PARAM_PASSWORD = password;
					};
				},
				getPageCount: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_GET_PAGE_COUNT;
				},
				getWidths: function (page, unit) {
					if (page === undefined || page === null) {
						throw "Invalid value for mandatory parameter 'page'";
					}
					if (unit === undefined || unit === null) {
						throw "Invalid value for mandatory parameter 'unit'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_GET_WIDTH;
					this.TOKEN_PARAM_PAGE = page;
					this.TOKEN_PARAM_UNIT = unit;
				},
				getHeights: function (page, unit) {
					if (page === undefined || page === null) {
						throw "Invalid value for mandatory parameter 'page'";
					}
					if (unit === undefined || unit === null) {
						throw "Invalid value for mandatory parameter 'unit'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_GET_HEIGHT;
					this.TOKEN_PARAM_PAGE = page;
					this.TOKEN_PARAM_UNIT = unit;
				},
				selectRect: function (page, left, top, width, height, unit) {
					if (page === undefined || page === null) {
						throw "Invalid value for mandatory parameter 'page'";
					}
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (width === undefined || width === null) {
						throw "Invalid value for mandatory parameter 'width'";
					}
					if (height === undefined || height === null) {
						throw "Invalid value for mandatory parameter 'height'";
					}
					if (unit === undefined || unit === null) {
						throw "Invalid value for mandatory parameter 'unit'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_SELECT_RECT;
					this.TOKEN_PARAM_PAGE = page;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_WIDTH = width;
					this.TOKEN_PARAM_HEIGHT = height;
					this.TOKEN_PARAM_UNIT = unit;
				},
				addImage: function (page, left, top, bitmap) {
					if (page === undefined || page === null) {
						throw "Invalid value for mandatory parameter 'page'";
					}
					if (left === undefined || left === null) {
						throw "Invalid value for mandatory parameter 'left'";
					}
					if (top === undefined || top === null) {
						throw "Invalid value for mandatory parameter 'top'";
					}
					if (bitmap === undefined || bitmap === null) {
						throw "Invalid value for mandatory parameter 'bitmap'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_ADD_IMAGE;
					this.TOKEN_PARAM_PAGE = page;
					this.TOKEN_PARAM_LEFT = left;
					this.TOKEN_PARAM_TOP = top;
					this.TOKEN_PARAM_BITMAP = bitmap;
				},
				removeImage: function (page, id) {
					if (page === undefined || page === null) {
						throw "Invalid value for mandatory parameter 'page'";
					}
					if (id === undefined || id === null) {
						throw "Invalid value for mandatory parameter 'id'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_PDF_REMOVE_IMAGE;
					this.TOKEN_PARAM_PAGE = page;
					this.TOKEN_PARAM_ID = id;
				},
			},

			// Pdf functions
			load: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getPageCount: async function () {
				return STPadServerLibCommons.createPromise(
					new context.Pdf.Params.getPageCount()
				);
			},
			getWidths: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getHeights: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			selectRect: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			addImage: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			removeImage: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
		};

		// RSA
		context.RSA = {
			Params: {
				getEncryptionCertId: function () {
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_GET_ENCRYPTION_CERT_ID;
				},
				setEncryptionCertPw: function (encryption_cert, device_password) {
					if (encryption_cert === undefined || encryption_cert === null) {
						throw "Invalid value for mandatory parameter 'encryption_cert'";
					}
					if (device_password === undefined || device_password === null) {
						throw "Invalid value for mandatory parameter 'device_password'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_SET_ENCRYPTION_CERT_PW;
					this.TOKEN_PARAM_ENCRYPTION_CERT = encryption_cert;
					this.TOKEN_PARAM_DEVICE_PASSWORD = device_password;
				},
				getRSASignData: function (options) {
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_GET_SIGN_DATA;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				setHash: function (hash, hashalgo, options) {
					if (hash === undefined || hash === null) {
						throw "Invalid value for mandatory parameter 'hash'";
					}
					if (hashalgo === undefined || hashalgo === null) {
						throw "Invalid value for mandatory parameter 'hashalgo'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_SET_HASH;
					this.TOKEN_PARAM_HASH = hash;
					this.TOKEN_PARAM_HASHALGO = hashalgo;
					this.TOKEN_PARAM_OPTIONS = options;
				},
				signPw: function (rsascheme, hashvalue, options, signpassword) {
					if (rsascheme === undefined || rsascheme === null) {
						throw "Invalid value for mandatory parameter 'rsascheme'";
					}
					if (hashvalue === undefined || hashvalue === null) {
						throw "Invalid value for mandatory parameter 'hashvalue'";
					}
					if (options === undefined || options === null) {
						throw "Invalid value for mandatory parameter 'options'";
					}
					if (signpassword === undefined || signpassword === null) {
						throw "Invalid value for mandatory parameter 'signpassword'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_SIGN_PW;
					this.TOKEN_PARAM_RSA_SCHEME = rsascheme;
					this.TOKEN_PARAM_HASHVALUE = hashvalue;
					this.TOKEN_PARAM_OPTIONS = options;
					this.TOKEN_PARAM_SIGN_PASSWORD = signpassword;
				},
				saveSigningCertAsStream: function (certtype) {
					if (certtype === undefined || certtype === null) {
						throw "Invalid value for mandatory parameter 'certtype'";
					}
					this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
					this.TOKEN_CMD = Strings.TOKEN_CMD_API_RSA_SAVE_SIGNING_CERT_AS_STREAM;
					this.TOKEN_PARAM_CERTTYPE = certtype;
				},
			},

			// RSA functions
			getEncryptionCertId: async function () {
				return STPadServerLibCommons.createPromise(
					new context.RSA.Params.getEncryptionCertId()
				);
			},
			setEncryptionCertPw: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			getRSASignData: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			setHash: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			signPw: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
			saveSigningCertAsStream: async function (params) {
				return STPadServerLibCommons.createPromise(params);
			},
		};

		context.handleResponse = function (message, resultObject) {
			switch (message.TOKEN_CMD_ORIGIN) {
				case Strings.TOKEN_CMD_API_DEVICE_GET_CONNECTION_TYPE:
					resultObject.connectionType = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_COM_PORT:
					resultObject.comPort = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_IP_ADDRESS:
					resultObject.ipAddress = message.TOKEN_PARAM_IPADDRESS;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_COUNT:
					resultObject.countedDevices = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_INFO:
					resultObject.serial = message.TOKEN_PARAM_SERIAL;
					resultObject.type = parseInt(message.TOKEN_PARAM_TYPE);
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_VERSION:
					resultObject.version = message.TOKEN_PARAM_VERSION;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_GET_CAPABILITIES:
					resultObject.capabilities = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_SENSOR_GET_SAMPLE_RATE_MODE:
					resultObject.sampleRateMode = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_SENSOR_ADD_HOT_SPOT:
				case Strings.TOKEN_CMD_API_SENSOR_ADD_SCROLL_HOT_SPOT:
					resultObject.hotspotId = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_STOP:
				case Strings.TOKEN_CMD_API_SIGNATURE_CONFIRM:
					resultObject.countedPoints = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_GET_RESOLUTION:
					resultObject.xResolution = parseInt(message.TOKEN_PARAM_PAD_X_RESOLUTION);
					resultObject.yResolution = parseInt(message.TOKEN_PARAM_PAD_Y_RESOLUTION);
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_GET_SIGN_DATA:
					resultObject.signData = message.TOKEN_PARAM_SIGN_DATA;
					break;
				case Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA:
					// workaround for STPadServer < 1.6.0.0
					resultObject.signData = message.TOKEN_PARAM_SIGNATURE_SIGN_DATA;
					message.TOKEN_CMD_ORIGIN = Strings.TOKEN_CMD_API_SIGNATURE_GET_SIGN_DATA;
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_SAVE_AS_STREAM_EX:
					resultObject.image = message.TOKEN_PARAM_IMAGE;
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_GET_BOUNDS:
					resultObject.left = parseInt(message.TOKEN_PARAM_LEFT);
					resultObject.top = parseInt(message.TOKEN_PARAM_TOP);
					resultObject.right = parseInt(message.TOKEN_PARAM_RIGHT);
					resultObject.bottom = parseInt(message.TOKEN_PARAM_BOTTOM);
					break;
				case Strings.TOKEN_CMD_API_SIGNATURE_GET_STATE:
					resultObject.state = resultObject.returnCode !== 0;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SET_TARGET:
					resultObject.targetId = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SET_TEXT:
					resultObject.textWidth = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SET_TEXT_IN_RECT:
					resultObject.fontSizeOrTextHeight = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SET_IMAGE_FROM_STORE:
					resultObject.storeId = resultObject.returnCode;
					if (resultObject.returnCode > 0) {
						resultObject.warn =
							"Storage was not reserved beforehand. You possibly need " +
							"to redo the operation for this component.";
					}
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_SCROLL_POS:
					resultObject.xPos = parseInt(message.TOKEN_PARAM_X_POS);
					resultObject.yPos = parseInt(message.TOKEN_PARAM_Y_POS);
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SAVE_IMAGE_AS_STREAM:
					resultObject.image = message.TOKEN_PARAM_IMAGE;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_CONFIG_SLIDE_SHOW_EX:
					resultObject.imageCount = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_STANDBY_ID:
					resultObject.numberOfStorages = resultObject.returnCode;
					resultObject.id = message.TOKEN_PARAM_ID;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_WIDTH:
					resultObject.width = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_HEIGHT:
					resultObject.height = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_TARGET_WIDTH:
					resultObject.targetWidth = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_TARGET_HEIGHT:
					resultObject.targetHeight = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_SCROLL_SPEED:
					resultObject.speed = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_ROTATION:
					resultObject.rotation = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_GET_RESOLUTION:
					resultObject.resolution = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_PDF_GET_PAGE_COUNT:
					resultObject.pageCount = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_PDF_GET_WIDTH:
					resultObject.widths = message.TOKEN_PARAM_RETURN_CODE;
					break;
				case Strings.TOKEN_CMD_API_PDF_GET_HEIGHT:
					resultObject.heights = message.TOKEN_PARAM_RETURN_CODE;
					break;
				case Strings.TOKEN_CMD_API_PDF_ADD_IMAGE:
					resultObject.id = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_API_DISPLAY_SET_PDF:
					resultObject.returnCodes = message.TOKEN_PARAM_RETURN_CODE;
					break;
				case Strings.TOKEN_CMD_API_RSA_GET_ENCRYPTION_CERT_ID:
					resultObject.encryptionCertId = message.TOKEN_PARAM_ENCRYPTION_CERT_ID;
					break;
				case Strings.TOKEN_CMD_API_RSA_GET_SIGN_DATA:
					resultObject.rsaSignData = message.TOKEN_PARAM_SIGN_DATA;
					break;
				case Strings.TOKEN_CMD_API_RSA_SIGN_PW:
					resultObject.rsaSignature = message.TOKEN_PARAM_RSA_SIGNATURE;
					break;
				case Strings.TOKEN_CMD_API_RSA_SAVE_SIGNING_CERT_AS_STREAM:
					resultObject.signingCert = message.TOKEN_PARAM_SIGNING_CERT;
					break;
				case Strings.TOKEN_CMD_API_DEVICE_SET_COM_PORT:
				case Strings.TOKEN_CMD_API_SENSOR_SET_SAMPLE_RATE_MODE:
				case Strings.TOKEN_CMD_API_SENSOR_SET_SIGN_RECT:
				case Strings.TOKEN_CMD_API_DEVICE_OPEN:
				case Strings.TOKEN_CMD_API_DEVICE_CLOSE:
				case Strings.TOKEN_CMD_API_SENSOR_CLEAR_SIGN_RECT:
				case Strings.TOKEN_CMD_API_SENSOR_SET_SCROLL_AREA:
				case Strings.TOKEN_CMD_API_SENSOR_SET_PEN_SCROLLING_ENABLED:
				case Strings.TOKEN_CMD_API_SENSOR_SET_HOT_SPOT_MODE:
				case Strings.TOKEN_CMD_API_SENSOR_CLEAR_HOT_SPOTS:
				case Strings.TOKEN_CMD_API_SIGNATURE_START:
				case Strings.TOKEN_CMD_API_SIGNATURE_RETRY:
				case Strings.TOKEN_CMD_API_SIGNATURE_CANCEL:
				case Strings.TOKEN_CMD_API_DISPLAY_ERASE:
				case Strings.TOKEN_CMD_API_DISPLAY_ERASE_RECT:
				case Strings.TOKEN_CMD_API_DISPLAY_CONFIG_PEN:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_IMAGE:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_FONT:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_FONT_COLOR:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_OVERLAY_RECT:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_SCROLL_POS:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_SCROLL_SPEED:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_STANDBY_IMAGE:
				case Strings.TOKEN_CMD_API_DISPLAY_SET_ROTATION:
				case Strings.TOKEN_CMD_API_PDF_LOAD:
				case Strings.TOKEN_CMD_API_PDF_SELECT_RECT:
				case Strings.TOKEN_CMD_API_PDF_REMOVE_IMAGE:
				case Strings.TOKEN_CMD_API_RSA_SET_ENCRYPTION_CERT_PW:
				case Strings.TOKEN_CMD_API_RSA_SET_HASH:
					// none
					break;
				default:
					return null;
			}
			return resultObject;
		};

		context.handleSendEvent = function (message) {
			switch (message.TOKEN_CMD) {
				case Strings.TOKEN_CMD_SIGNATURE_POINT:
					const x = parseInt(message.TOKEN_PARAM_POINT["x"]);
					const y = parseInt(message.TOKEN_PARAM_POINT["y"]);
					const p = parseInt(message.TOKEN_PARAM_POINT["p"]);
					STPadServerLibCommons.handleNextSignaturePoint(x, y, p);
					break;
				case Strings.TOKEN_CMD_DISCONNECT:
					STPadServerLibCommons.handleDisconnect(message.TOKEN_PARAM_PAD_INDEX);
					break;
				default:
					eventQueue.enqueue(message);
			}
		};

		const EventQueue = function () {
			this.queue = [];
			this.contentMap = new Map();

			this.enqueue = function (item) {
				STPadServerLibCommons.handleLogging(
					"STPadServerLibApi.EventQueue.enqueue(): item = " + JSON.stringify(item)
				);
				if (this.contentMap.has(item.TOKEN_CMD)) {
					this.queue = this.queue.filter((cmd) => cmd !== item.TOKEN_CMD);
				}
				this.queue.push(item.TOKEN_CMD);
				this.contentMap.set(item.TOKEN_CMD, item);
			};
			this.dequeue = function () {
				if (this.isEmpty()) {
					return null;
				}
				const item = this.queue.shift();
				const content = this.contentMap.get(item);
				this.contentMap.delete(item);
				STPadServerLibCommons.handleLogging(
					"STPadServerLibApi.EventQueue.dequeue() returns " + JSON.stringify(content)
				);
				return content;
			};
			this.isEmpty = function () {
				return this.queue.length === 0;
			};
			this.printQueue = function () {
				const res = " | ";
				for (let i = 0; i < this.queue.length; i++) {
					res += JSON.stringify(this.contentMap.get(this.queue[i])) + " | ";
				}
				return res;
			};
		};

		const eventQueue = new EventQueue();
		const triggerNextEvent = true;
		(async function trigger() {
			if (triggerNextEvent) {
				await Promise.resolve();
				let nextEvent = eventQueue.dequeue();
				if (nextEvent != null) {
					try {
						STPadServerLibCommons.handleLogging(
							"STPadServerLibApi.trigger() handles " + JSON.stringify(nextEvent)
						);
						switch (nextEvent.TOKEN_CMD) {
							case Strings.TOKEN_CMD_API_SENSOR_HOT_SPOT_PRESSED:
								await context.Sensor.handleHotSpotPressed(
									parseInt(nextEvent.TOKEN_PARAM_HOTSPOT_ID)
								);
								break;
							case Strings.TOKEN_CMD_API_DISPLAY_SCROLL_POS_CHANGED:
								await context.Sensor.handleDisplayScrollPosChanged(
									parseInt(nextEvent.TOKEN_PARAM_X_POS),
									parseInt(nextEvent.TOKEN_PARAM_Y_POS)
								);
								break;
							case Strings.TOKEN_CMD_DISCONNECT:
								await STPadServerLibCommons.handleDisconnect(
									nextEvent.TOKEN_PARAM_INDEX
								);
								break;
							default:
								STPadServerLibCommons.handleLogging(
									"STPadServerLibApi.trigger() can't handle " + JSON.stringify(nextEvent)
								);
								await Promise.resolve();
								break;
						}
					} catch (reason) {
						STPadServerLibCommons.handleLogging(
							"STPadServerLibApi.trigger() failed because of " + JSON.stringify(reason)
						);
					}
				}
			}
			setTimeout(trigger, 1);
		})();
	})(STPadServerLibApi);

	const STPadServerLibDefault = {};
	(function (context) {
		context.handleRetrySignature = function (message) {};
		context.handleConfirmSignature = function (message) {};
		context.handleCancelSignature = function (message) {};
		context.handleConfirmSelection = function (message) {};
		context.handleCancelSelection = function (message) {};
		context.handleSelectionChange = function (message) {};

		// const (enums)
		context.FileType = {
			TIFF: 0,
			PNG: 1,
			BMP: 2,
			JPEG: 3,
			GIF: 4,
		};

		context.FontStyle = {
			BOLD: "BOLD",
			ITALIC: "ITALIC",
			UNDERLINE: "UNDERLINE",
		};

		context.RsaScheme = {
			None: "NONE",
			NoOID: "NO_HASH_OID",
			PKCS1_V1_5: "PKCS1_V1_5",
			PSS: "PSS",
		};

		const Strings = {
			TOKEN_TYPE_REQUEST: "TOKEN_TYPE_REQUEST",
			TOKEN_CMD_SEARCH_FOR_PADS: "TOKEN_CMD_SEARCH_FOR_PADS",
			TOKEN_CMD_OPEN_PAD: "TOKEN_CMD_OPEN_PAD",
			TOKEN_CMD_CLOSE_PAD: "TOKEN_CMD_CLOSE_PAD",
			TOKEN_CMD_SIGNATURE_START: "TOKEN_CMD_SIGNATURE_START",
			TOKEN_CMD_SIGNATURE_CANCEL: "TOKEN_CMD_SIGNATURE_CANCEL",
			TOKEN_CMD_SIGNATURE_RETRY: "TOKEN_CMD_SIGNATURE_RETRY",
			TOKEN_CMD_SIGNATURE_CONFIRM: "TOKEN_CMD_SIGNATURE_CONFIRM",
			TOKEN_CMD_SIGNATURE_SIGN_DATA: "TOKEN_CMD_SIGNATURE_SIGN_DATA",
			TOKEN_CMD_SIGNATURE_IMAGE: "TOKEN_CMD_SIGNATURE_IMAGE",
			TOKEN_CMD_SIGNING_CERT: "TOKEN_CMD_SIGNING_CERT",
			TOKEN_CMD_SIGNATURE_POINT: "TOKEN_CMD_SIGNATURE_POINT",
			TOKEN_CMD_SELECTION_DIALOG: "TOKEN_CMD_SELECTION_DIALOG",
			TOKEN_CMD_SELECTION_CHANGE: "TOKEN_CMD_SELECTION_CHANGE",
			TOKEN_CMD_SELECTION_CONFIRM: "TOKEN_CMD_SELECTION_CONFIRM",
			TOKEN_CMD_SIGNATURE_STOP: "TOKEN_CMD_SIGNATURE_STOP",
			TOKEN_CMD_SELECTION_CANCEL: "TOKEN_CMD_SELECTION_CANCEL",
			TOKEN_CMD_DISCONNECT: "TOKEN_CMD_DISCONNECT",
			TOKEN_CMD_ERROR: "TOKEN_CMD_ERROR",

			TOKEN_PARAM_CONNECTED_PADS: "TOKEN_PARAM_CONNECTED_PADS",
			TOKEN_PARAM_LAYOUT_ID: "TOKEN_PARAM_LAYOUT_ID",
			TOKEN_PARAM_TEXT_BLOCKS: "TOKEN_PARAM_TEXT_BLOCKS",
			TOKEN_PARAM_TEXT: "TOKEN_PARAM_TEXT",
			TOKEN_PARAM_WIDTH: "TOKEN_PARAM_WIDTH",
			TOKEN_PARAM_HEIGHT: "TOKEN_PARAM_HEIGHT",
			TOKEN_PARAM_FONT_NAME: "TOKEN_PARAM_FONT_NAME",
			TOKEN_PARAM_FONT_STYLE: "TOKEN_PARAM_FONT_STYLE",
			TOKEN_PARAM_MAX_FONT_SIZE: "TOKEN_PARAM_MAX_FONT_SIZE",
			TOKEN_PARAM_FONT_SIZE_ID: "TOKEN_PARAM_FONT_SIZE_ID",
			TOKEN_PARAM_CONSTANT: "TOKEN_PARAM_CONSTANT",
			TOKEN_PARAM_FIELD_LIST: "TOKEN_PARAM_FIELD_LIST",
			TOKEN_PARAM_FIELD_ID: "TOKEN_PARAM_FIELD_ID",
			TOKEN_PARAM_FIELD_TEXT: "TOKEN_PARAM_FIELD_TEXT",
			TOKEN_PARAM_FIELD_CHECKED: "TOKEN_PARAM_FIELD_CHECKED",
			TOKEN_PARAM_FIELD_REQUIRED: "TOKEN_PARAM_FIELD_REQUIRED",
		};

		context.Params = {
			searchForPads: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SEARCH_FOR_PADS;

				this.setPadSubset = function (padSubset) {
					if (padSubset === undefined || padSubset === null) {
						throw "'padSubset' is undefined or null";
					}
					this.TOKEN_PARAM_PAD_SUBSET = padSubset;
				};
			},
			openPad: function (index) {
				if (index === undefined || index === null) {
					throw "Invalid value for mandatory parameter 'index'";
				}
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_OPEN_PAD;
				this.TOKEN_PARAM_PAD_INDEX = index;
			},
			closePad: function (index) {
				if (index === undefined || index === null) {
					throw "Invalid value for mandatory parameter 'index'";
				}
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_CLOSE_PAD;
				this.TOKEN_PARAM_PAD_INDEX = index;
			},
			startSignature: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_START;
				this.TOKEN_PARAM_PAD_ENCRYPTION = "FALSE";

				this.setFieldName = function (fieldName) {
					if (fieldName === undefined || fieldName === null) {
						throw "'fieldName' is undefined or null";
					}
					this.TOKEN_PARAM_FIELD_NAME = fieldName;
				};

				this.setCustomText = function (customText) {
					if (customText === undefined || customText === null) {
						throw "'customText' is undefined or null";
					}
					this.TOKEN_PARAM_CUSTOM_TEXT = customText;
				};

				this.enablePadEncryption = function (
					docHash,
					encryptionCert,
					encryptionCertOnlyWhenEmpty
				) {
					this.TOKEN_PARAM_PAD_ENCRYPTION = "TRUE";
					if (docHash === undefined || docHash === null) {
						// do nothing (optional)
					} else {
						this.TOKEN_PARAM_DOCHASH = docHash;
					}
					if (encryptionCert === undefined || encryptionCert === null) {
						// do nothing (optional)
					} else {
						this.TOKEN_PARAM_ENCRYPTION_CERT = encryptionCert;
					}
					if (
						encryptionCertOnlyWhenEmpty === undefined ||
						encryptionCertOnlyWhenEmpty === null
					) {
						// do nothing (optional)
					} else {
						this.TOKEN_PARAM_ENCRYPTION_CERT_ONLY_WHEN_EMPTY =
							encryptionCertOnlyWhenEmpty;
					}
				};

				this.setDialogImage = function (dialogImage) {
					if (dialogImage === undefined || dialogImage === null) {
						throw "'dialogImage' is undefined or null";
					}
					this.TOKEN_PARAM_PAD_DIALOG_IMAGE = dialogImage;
				};

				this.setTextLayout = function (textLayout) {
					if (textLayout === undefined || textLayout === null) {
						throw "'textLayout' is undefined or null";
					}
					const layout = {};
					layout[Strings.TOKEN_PARAM_LAYOUT_ID] = textLayout.id;
					const textBlocks = [];
					for (let i = 0; i < textLayout.textBlocks.length; i++) {
						const textBlock = {};
						textBlock[Strings.TOKEN_PARAM_TEXT] = textLayout.textBlocks[i].text;
						textBlock[Strings.TOKEN_PARAM_WIDTH] = textLayout.textBlocks[i].width;
						textBlock[Strings.TOKEN_PARAM_HEIGHT] = textLayout.textBlocks[i].height;
						textBlock[Strings.TOKEN_PARAM_FONT_NAME] =
							textLayout.textBlocks[i].fontName;
						textBlock[Strings.TOKEN_PARAM_FONT_STYLE] =
							textLayout.textBlocks[i].fontStyle;
						textBlock[Strings.TOKEN_PARAM_MAX_FONT_SIZE] =
							textLayout.textBlocks[i].maxFontSize;
						textBlock[Strings.TOKEN_PARAM_FONT_SIZE_ID] =
							textLayout.textBlocks[i].fontSizeId;
						textBlock[Strings.TOKEN_PARAM_CONSTANT] =
							textLayout.textBlocks[i].constant;
						textBlocks.push(textBlock);
					}
					layout[Strings.TOKEN_PARAM_TEXT_BLOCKS] = textBlocks;
					this.TOKEN_PARAM_TEXT_LAYOUT = layout;
				};
			},
			cancelSignature: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_CANCEL;
			},
			retrySignature: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_RETRY;
			},
			confirmSignature: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_CONFIRM;
			},
			stopSignature: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_STOP;
			},
			startSelectionDialog: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SELECTION_DIALOG;

				this.addCheckboxInformation = function (cbInformation) {
					if (cbInformation === undefined || cbInformation === null) {
						throw "'cbInformation' is undefined or null";
					}
					const cbArray = [];
					for (let i = 0; i < cbInformation.length; i++) {
						const checkbox = {};
						checkbox[Strings.TOKEN_PARAM_FIELD_ID] = cbInformation[i].id;
						checkbox[Strings.TOKEN_PARAM_FIELD_TEXT] = cbInformation[i].text;
						checkbox[Strings.TOKEN_PARAM_FIELD_CHECKED] = cbInformation[i].checked;
						checkbox[Strings.TOKEN_PARAM_FIELD_REQUIRED] = cbInformation[i].required;
						cbArray.push(checkbox);
					}
					this.TOKEN_PARAM_FIELD_LIST = cbArray;
				};
			},
			getSignatureData: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA;

				this.setRsaScheme = function (rsaScheme) {
					if (rsaScheme === undefined || rsaScheme === null) {
						throw "'rsaScheme' is undefined or null";
					}
					this.TOKEN_PARAM_SIGNATURE_RSA_SCHEME = rsaScheme;
				};
			},
			getSignatureImage: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNATURE_IMAGE;

				this.setFileType = function (fileType) {
					if (fileType === undefined || fileType === null) {
						throw "'fileType' is undefined or null";
					}
					this.TOKEN_PARAM_FILE_TYPE = fileType;
				};

				this.setPenWidth = function (penWidth) {
					if (penWidth === undefined || penWidth === null) {
						throw "'penWidth' is undefined or null";
					}
					this.TOKEN_PARAM_PEN_WIDTH = penWidth;
				};
			},
			getSigningCert: function () {
				this.TOKEN_TYPE = Strings.TOKEN_TYPE_REQUEST;
				this.TOKEN_CMD = Strings.TOKEN_CMD_SIGNING_CERT;
			},
		};

		context.searchForPads = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.openPad = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.closePad = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.startSignature = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.cancelSignature = async function () {
			return STPadServerLibCommons.createPromise(
				new context.Params.cancelSignature()
			);
		};
		context.retrySignature = async function () {
			return STPadServerLibCommons.createPromise(
				new context.Params.retrySignature()
			);
		};
		context.confirmSignature = async function () {
			return STPadServerLibCommons.createPromise(
				new context.Params.confirmSignature()
			);
		};
		context.stopSignature = async function () {
			return STPadServerLibCommons.createPromise(
				new context.Params.stopSignature()
			);
		};

		context.startSelectionDialog = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.getSignatureData = async function (params) {
			if (params === undefined || params === null) {
				return STPadServerLibCommons.createPromise(
					new context.Params.getSignatureData()
				);
			} else {
				return STPadServerLibCommons.createPromise(params);
			}
		};
		context.getSignatureImage = async function (params) {
			return STPadServerLibCommons.createPromise(params);
		};
		context.getSigningCert = async function () {
			return STPadServerLibCommons.createPromise(
				new context.Params.getSigningCert()
			);
		};

		context.handleResponse = function (message, resultObject) {
			switch (message.TOKEN_CMD_ORIGIN) {
				case Strings.TOKEN_CMD_SEARCH_FOR_PADS:
					const foundPads = [];
					const pads = message[Strings.TOKEN_PARAM_CONNECTED_PADS];
					if (pads) {
						for (let i = 0; i < pads.length; i++) {
							const padInfo = {};
							padInfo.index = pads[i].TOKEN_PARAM_PAD_INDEX;
							padInfo.type = parseInt(pads[i].TOKEN_PARAM_PAD_TYPE);
							padInfo.comPort = pads[i].TOKEN_PARAM_PAD_COM_PORT;
							padInfo.connectionType = pads[i].TOKEN_PARAM_PAD_CONNECTION_TYPE;
							padInfo.firmwareVersion = pads[i].TOKEN_PARAM_PAD_FIRMWARE_VERSION;
							padInfo.ipAddress = pads[i].TOKEN_PARAM_PAD_IP_ADDRESS;
							padInfo.serialNumber = pads[i].TOKEN_PARAM_PAD_SERIAL_NUMBER;
							padInfo.capabilities = pads[i].TOKEN_PARAM_PAD_CAPABILITIES;
							foundPads[i] = padInfo;
						}
					}
					resultObject.foundPads = foundPads;
					break;
				case Strings.TOKEN_CMD_OPEN_PAD:
					const padData = {};
					padData.displayWidth = parseInt(message.TOKEN_PARAM_PAD_DISPLAY_WIDTH);
					padData.displayHeight = parseInt(message.TOKEN_PARAM_PAD_DISPLAY_HEIGHT);
					padData.xResolution = parseInt(message.TOKEN_PARAM_PAD_X_RESOLUTION);
					padData.yResolution = parseInt(message.TOKEN_PARAM_PAD_Y_RESOLUTION);
					padData.samplingRate = parseInt(message.TOKEN_PARAM_PAD_SAMPLING_RATE);
					padData.dialogWidth = parseInt(message.TOKEN_PARAM_PAD_DIALOG_WIDTH);
					padData.dialogHeight = parseInt(message.TOKEN_PARAM_PAD_DIALOG_HEIGHT);
					padData.displayResolution = parseInt(
						message.TOKEN_PARAM_PAD_DISPLAY_RESOLUTION
					);
					resultObject.padInfo = padData;
					break;
				case Strings.TOKEN_CMD_SIGNATURE_CONFIRM:
					resultObject.countedPoints = resultObject.returnCode;
					break;
				case Strings.TOKEN_CMD_SIGNATURE_START:
				case Strings.TOKEN_CMD_SELECTION_DIALOG:
				case Strings.TOKEN_CMD_SIGNATURE_CANCEL:
				case Strings.TOKEN_CMD_CLOSE_PAD:
				case Strings.TOKEN_CMD_SIGNATURE_RETRY:
					// no further information in response here
					break;
				case Strings.TOKEN_CMD_SIGNATURE_SIGN_DATA:
					resultObject.signData = message.TOKEN_PARAM_SIGNATURE_SIGN_DATA;
					resultObject.certId = message.TOKEN_PARAM_CERT_ID;
					resultObject.rsaSignature = message.TOKEN_PARAM_SIGNATURE_RSA_SIGNATURE;
					break;
				case Strings.TOKEN_CMD_SIGNATURE_IMAGE:
					resultObject.file = message.TOKEN_PARAM_FILE;
					break;
				case Strings.TOKEN_CMD_SIGNING_CERT:
					resultObject.signingCert = message.TOKEN_PARAM_SIGNING_CERT;
					break;
				default:
					return null;
			}
			return resultObject;
		};

		context.handleSendEvent = function (message) {
			switch (message.TOKEN_CMD) {
				case Strings.TOKEN_CMD_SIGNATURE_POINT:
					const x = parseInt(message.TOKEN_PARAM_POINT["x"]);
					const y = parseInt(message.TOKEN_PARAM_POINT["y"]);
					const p = parseInt(message.TOKEN_PARAM_POINT["p"]);
					STPadServerLibCommons.handleNextSignaturePoint(x, y, p);
					break;
				case Strings.TOKEN_CMD_SIGNATURE_CANCEL:
					context.handleCancelSignature();
					break;
				case Strings.TOKEN_CMD_SIGNATURE_RETRY:
					context.handleRetrySignature();
					break;
				case Strings.TOKEN_CMD_SIGNATURE_CONFIRM:
					context.handleConfirmSignature();
					break;
				case Strings.TOKEN_CMD_SELECTION_CANCEL:
					context.handleCancelSelection();
					break;
				case Strings.TOKEN_CMD_SELECTION_CONFIRM:
					context.handleConfirmSelection();
					break;
				case Strings.TOKEN_CMD_DISCONNECT:
					STPadServerLibCommons.handleDisconnect(message.TOKEN_PARAM_PAD_INDEX);
					break;
				case Strings.TOKEN_CMD_SELECTION_CHANGE:
					context.handleSelectionChange(
						message.TOKEN_PARAM_FIELD_ID,
						message.TOKEN_PARAM_FIELD_CHECKED
					);
					break;
				case Strings.TOKEN_CMD_ERROR:
					context.handleError(
						message.TOKEN_PARAM_ERROR_CONTEXT,
						parseInt(message.TOKEN_PARAM_RETURN_CODE),
						message.TOKEN_PARAM_ERROR_DESCRIPTION
					);
					break;
				default:
					return null;
			}
			return "found";
		};
	})(STPadServerLibDefault);

	if (typeof exports === "object" && typeof module === "object") {
		module.exports = {
			STPadServerLibDefault: STPadServerLibDefault,
			STPadServerLibCommons: STPadServerLibCommons,
			STPadServerLibApi: STPadServerLibApi,
		};
	} else {
		exports.STPadServerLibDefault = STPadServerLibDefault;
		exports.STPadServerLibCommons = STPadServerLibCommons;
		exports.STPadServerLibApi = STPadServerLibApi;
	}
});
