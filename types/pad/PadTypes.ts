export enum PadStates {
	Closed = 0,
	Opened = 1,
}

export const padState = PadStates.Closed;

export enum DialogTypes {
	Signature = 0,
	PDF = 1,
}

export const dialogType = DialogTypes.Signature;

export enum PadModes {
	Default = 0,
	API = 1,
}

export const padMode = PadModes.Default;

export enum PadTypes {
	SigmaUSB = 1,
	SigmaSerial = 2,
	ZetaUSB = 5,
	ZetaSerial = 6,
	OmegaUSB = 11,
	OmegaSerial = 12,
	GammaUSB = 15,
	GammaSerial = 16,
	DeltaUSB = 21,
	DeltaSerial = 22,
	DeltaIP = 23,
	AlphaUSB = 31,
	AlphaSerial = 32,
	AlphaIP = 33,
}

export const padType = 0;

export const enum DeviceCapabilities {
	HasColorDisplay = 0x00000001,
	HasBacklight = 0x00000002,
	SupportsVerticalScrolling = 0x00000004,
	SupportsHorizontalScrolling = 0x00000008,
	SupportsPenScrolling = 0x00000010,
	SupportsServiceMenu = 0x00000020,
	SupportsRSA = 0x00000040,
	SupportsContentSigning = 0x00000080,
	SupportsH2ContentSigning = 0x00000100,
	CanGenerateSignKey = 0x00000200,
	CanStoreSignKey = 0x00000400,
	CanStoreEncryptKey = 0x00000800,
	CanSignExternalHash = 0x00001000,
	SupportsRSAPassword = 0x00002000,
	SupportsSecureModePassword = 0x00004000,
	Supports4096BitKeys = 0x00008000,
	HasNFCReader = 0x00010000,
	SupportsKeyPad = 0x00020000,
	SupportsKeyPad32 = 0x00040000,
	HasDisplay = 0x00080000,
	SupportsRSASignPassword = 0x00100000,
}

export enum Target {
	Foreground = 0,
	Background = 1,
	Overlay = 2,
}

export enum DocHashesValues {
	SHA1 = 0,
	SHA256 = 1,
}

export enum RsaScheme {
	None = "NONE",
	NoOID = "NO_HASH_OID",
	PKCS1_V1_5 = "PKCS1_V1_5",
	PSS = "PSS",
}

export enum CertType {
	CERT_DER = "CERT_DER",
	CSR_DER = "CSR_DER",
	CERT_PEM = "CERT_PEM",
	CSR_PEM = "CSR_PEM",
}

export enum HashValue {
	Combination = "COMBINATION",
	Hash1 = "HASH1",
	Hash2 = "HASH2",
}

export const cancelButton = -1;
export const retryButton = -1;
export const confirmButton = -1;
export const buttonTop = 0;
export const buttonSize = 0;
export let backgroundImage: string | undefined;

export const supportsRSA = false;
export const canStoreEncryptKey = false;

export const field_name = "DMS MINT E-Signature Service";
export const custom_text = "Please sign!";
export const encryption = "TRUE";
export let default_dochash: string | undefined;
export let api_dochash: string | undefined;
export const docHash_type = DocHashesValues.SHA256;

export enum DocHashes {
	SHA1 = "AAECAwQFBgcICQoLDA0ODxAREhM=",
	SHA256 = "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
}

export enum PenColors {
	GREY = "0x007f7f7f",
	RED = "0x000000ff",
	GREEN = "0x0000ff00",
	BLUE = "0x00ff0000",
	BLACK = "0x00000000",
}

export enum Modes {
	DEFAULT = "Default",
	API = "API",
}

export enum OperatingSystems {
	WINDOWS = "Windows",
	LINUX = "Linux",
	UNKNOWN = "Unknown",
}

// Constants
export const encryption_cert =
	"MIICqTCCAZGgAwIBAgIBATANBgkqhkiG9w0BAQUFADAYMRYwFAYDVQQKEw1EZW1vIHNpZ25vdGVjMB4XDTE1MTAwNzA5NDc1MFoXDTI1MTAwNDA5NDc1MFowGDEWMBQGA1UEChMNRGVtbyBzaWdub3RlYzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOFFpsZexYW28Neznn26Bp9NVCJywFFj1QYXg3DDsaSyr6ubuqXKSC4jkenIGBnom/zKPxwPDtNXuy+nyDYFXYNn87TUdh/51CCr3uk9kR9hvRIzBKwkOx0DGLdCoSGAKDOPHwx1rE0m/SOqYOQh6XFjlybw+KzDZcPvhf2Fq/IFNXHpk8m0YHMAReW8q34CYjk9ZtcIlrcYGTikQherOtYM8CaEUPDd6vdJgosGWEnDeNXDCAIWTFc5ECJm9Hh7a47eF3BG5Pjl1QfOSA8lQBV5eTjQc1n1rWCWULt143nIbN5yCFrn0D8W6+eKJV5urETxWUQ208iqgeU1bIgKSEUCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAt2ax8iwLFoOmlAOZTQcRQtjxseQAhgOTYL/vEP14rPZhF1/gkI9ZzhESdkqR8mHIIl7FnfBg9A2v9ZccC7YgRb4bCXNzv6TIEyz4EYXNkIq8EaaQpvsX4+A5jKIP0PRNZUaLJaDRcQZudd6FMyHxrHtCUTEvORzrgGtRnhBDhAMiSDmQ958t8RhET6HL8C7EnL7f8XBMMFR5sDC60iCu/HeIUkCnx/a2waZ13QvhEIeUBmTRi9gEjZEsGd1iZmgf8OapTjefZMXlbl7CJBymKPJgXFe5mD9/yEMFKNRy5Xfl3cB2gJka4wct6PSIzcQVPaCts6I0V9NfEikXy1bpSA==";
export const encryption_cert_only_when_empty = true;

export const padIndex = 0;
export let padConnectionType: string | undefined;
export let sampleRate: number | undefined;

export const wsUri = "wss://127.0.0.1:49494/";

// Operating System
export const os: OperatingSystems = OperatingSystems.WINDOWS;
