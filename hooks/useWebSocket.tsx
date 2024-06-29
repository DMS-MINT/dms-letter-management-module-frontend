import { useEffect } from "react";
import {
  ILetterDetails,
  IPermissions,
  IPermissionsInputSerializer,
} from "@/typing/interface";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLetterDetails } from "@/lib/features/letter/letterSlice";
import { setPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { selectMe } from "@/lib/features/authentication/authSlice";

type MessageType = {
  data: ILetterDetails;
  permissions: IPermissionsInputSerializer[];
};

export default function useWebSocket(referenceNumber: string) {
  const me = useAppSelector(selectMe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/letters/${referenceNumber}/`
    );

    console.log(socket);

    socket.onmessage = (event) => {
      const data: MessageType = JSON.parse(event.data).message;
      const permissions = data.permissions;
      console.log("WebSocket message received:", data);
      dispatch(updateLetterDetails(data.data));
      dispatch(setPermissions({ permissions, me }));
    };

    return () => {
      socket.close();
    };
  }, [referenceNumber, dispatch]);
}
