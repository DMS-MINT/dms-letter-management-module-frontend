"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getContacts } from "@/lib/features/contact/contactSlice";
import { getMe } from "@/lib/features/authentication/authSlice";
import { selectCurrentUserPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { toggleIsReadOnly } from "@/lib/features/ui/uiManagerSlice";
import { useMutation } from "@tanstack/react-query";
import { get_my_profile } from "@/actions/user_module/action";

export default function DataLoader() {
	const { mutate } = useMutation({
		mutationKey: ["getMyProfile"],
		mutationFn: () => get_my_profile(),
		onSuccess: (data) => {
			console.log(data);
		},
	});
	const currentUserPermissions = useAppSelector(selectCurrentUserPermissions);
	const dispatch = useAppDispatch();

	useEffect(() => {
		mutate();
	}, []);

	// useEffect(() => {
	// 	const fetchData = () => {
	// 		try {
	// 			// Fetch Me
	// 			dispatch(getMe({}));

	// 			// Fetch contacts
	// 			dispatch(getContacts({}));
	// 		} catch (error: any) {
	// 			toast.error("Error fetching data:", error);
	// 		}
	// 	};

	// 	fetchData();
	// }, [dispatch]);

	useEffect(() => {
		dispatch(toggleIsReadOnly(!currentUserPermissions.can_update_letter));
	}, [currentUserPermissions]);

	return <span className="absolute"></span>;
}
