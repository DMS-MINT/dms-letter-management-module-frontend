"use client";

import { useSTPadStore } from "@/lib/stores/stpadStore";
import { OperatingSystems, wsUri } from "@/types/pad/PadTypes";
import { useEffect, useState, useCallback } from "react";

export function useSTPadServerConnection() {
	const [status, setStatus] = useState<string>("Connecting...");
	const [logs, setLogs] = useState<string[]>([]);
	const [state, setState] = useState<{ className: string; message: string }>({
		className: "",
		message: "",
	});
	const [os, setOS] = useState<OperatingSystems>(OperatingSystems.UNKNOWN);
	const [serverVersion, setServerVersion] = useState<string>("");
	const { isConnected, isLoading, setIsConnected, setIsLoading } =
		useSTPadStore();

	const createConnection = useCallback(() => {
		if (typeof window !== "undefined" && (window as any).STPadServerLib) {
			const STPadServerLibCommons = (window as any).STPadServerLib
				.STPadServerLibCommons;

			// Destroy any existing connection
			STPadServerLibCommons.destroyConnection();

			const logMessage = (msg: string) => {
				setLogs((prevLogs) => [...prevLogs, msg]);
			};

			const onOpen = (evt: any) => {
				setState({
					className: "bg-green-200",
					message: `Connected to ${evt.target.url}`,
				});
				setStatus("Connection successful!");
				setIsConnected(true);
				setIsLoading(false);
				getServerVersion();
			};

			const onClose = (evt: any) => {
				setState({
					className: "bg-red-200",
					message: `Disconnected from ${evt.target.url}`,
				});
				setStatus("Disconnected from the server.");
				setIsConnected(false);
				setIsLoading(false);
			};

			const onError = (evt: any) => {
				setState({
					className: "bg-red-200",
					message: `Communication error with ${evt.target.url}`,
				});
				setStatus("Communication error.");
				setIsConnected(false);
				setIsLoading(false);
			};

			const getServerVersion = async () => {
				try {
					const serverVersion = await STPadServerLibCommons.getServerVersion();
					setOS(serverVersion.os as OperatingSystems);
					setServerVersion(serverVersion.serverVersion);
					logMessage(
						`Server version: ${serverVersion.serverVersion}, OS: ${serverVersion.os}`
					);
				} catch (error) {
					console.error("Error in getServerVersion", error);
					alert("Failed to get server version");
				}
			};

			STPadServerLibCommons.handleLogging = logMessage;
			STPadServerLibCommons.createConnection(wsUri, onOpen, onClose, onError);
		} else {
			console.error("Failed to load STPadServerLib.");
			setStatus("Failed to load STPadServerLib.");
			setIsLoading(false);
		}
	}, [setIsConnected, setIsLoading]);

	// Initialize connection on mount
	useEffect(() => {
		createConnection();
	}, [createConnection]);

	// Reconnect function
	const reconnect = useCallback(() => {
		setStatus("Reconnecting...");
		setLogs([]);
		createConnection();
	}, [createConnection]);

	return {
		status,
		logs,
		state,
		os,
		serverVersion,
		isConnected,
		isLoading,
		reconnect,
	};
}
