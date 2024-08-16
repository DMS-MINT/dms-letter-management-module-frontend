import { useCallback, useEffect, useRef } from "react";

type Props<T> = {
	url: string;
	onMessage: (message: T) => void;
	reconnectInterval?: number; // In milliseconds
};

export default function useWebsocket<T>({
	url,
	onMessage,
	reconnectInterval = 5000,
}: Props<T>) {
	const ws = useRef<WebSocket | null>(null);
	const reconnectTimeout = useRef<number | null>(null);

	const connect = useCallback(() => {
		if (ws.current) {
			ws.current.close();
		}

		ws.current = new WebSocket(url);

		ws.current.onopen = () => {
			console.log("WebSocket connection established");

			if (reconnectTimeout.current) {
				clearTimeout(reconnectTimeout.current);
				reconnectTimeout.current = null;
			}
		};

		ws.current.onmessage = (e) => {
			const data: T = JSON.parse(e.data).message;
			onMessage(data);
		};

		ws.current.onclose = (e) => {
			console.log("WebSocket connection closed", e.reason);

			if (!reconnectTimeout.current) {
				reconnectTimeout.current = window.setTimeout(() => {
					connect();
				}, reconnectInterval);
			}
		};

		ws.current.onerror = (error) => {
			console.error("WebSocket error", error);

			if (!reconnectTimeout.current) {
				reconnectTimeout.current = window.setTimeout(() => {
					connect();
				}, reconnectInterval);
			}
		};
	}, [url, onMessage, reconnectInterval]);

	useEffect(() => {
		connect();

		return () => {
			if (ws.current) {
				ws.current.close();
			}
			if (reconnectTimeout.current) {
				clearTimeout(reconnectTimeout.current);
			}
		};
	}, [connect]);

	return {};
}
