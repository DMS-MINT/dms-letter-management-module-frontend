"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Ref,
	forwardRef,
	memo,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOTP } from "@/hooks";

export type ActionConfirmModalRef = {
	getOTP: () => number;
};

type ActionConfirmModalProps = {
	triggerButtonText: string;
	triggerButtonVariant: "default" | "destructive" | "outline" | "third";
	dialogTitle: string;
	dialogDescription: string;
	confirmButtonText: string;
	cancelButtonText: string;
	onConfirm: () => void;
	requiresAuth: boolean;
};

function ActionConfirmModal(
	{
		triggerButtonText,
		triggerButtonVariant,
		dialogTitle,
		dialogDescription,
		confirmButtonText,
		cancelButtonText,
		onConfirm,
		requiresAuth,
	}: ActionConfirmModalProps,
	ref: Ref<ActionConfirmModalRef>
) {
	const { form, getOTP, handleInputChange } = useOTP();
	const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);

	useImperativeHandle(ref, () => ({
		getOTP,
	}));

	const handleInputChangeWrapper = useCallback(
		(otp: string) => {
			handleInputChange(otp);
			if (hasBeenClicked) {
				setHasBeenClicked(false);
			}
		},
		[handleInputChange, hasBeenClicked]
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant={triggerButtonVariant}
					onClick={() => {
						form.reset();
					}}
				>
					{triggerButtonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col rounded-md bg-white p-4 shadow-lg">
				<DialogHeader className="flex-1 p-2">
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>

				{requiresAuth ? (
					<Form {...form}>
						<form
							className="px-2"
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<FormField
								control={form.control}
								name="otp"
								render={() => (
									<FormItem>
										<FormLabel>የአንድ ጊዜ የይለፍ ቃልዎን ያስገቡ</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} onChange={handleInputChangeWrapper}>
												<InputOTPGroup className="w-full">
													{Array.from({ length: 6 }).map((_, index) => (
														<InputOTPSlot key={index} index={index} className="flex-1" />
													))}
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage className="form-error-message" />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				) : null}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">{cancelButtonText}</Button>
					</DialogClose>
					<Button
						disabled={
							(requiresAuth && getOTP()?.toString().length !== 6) || hasBeenClicked
						}
						type="submit"
						onClick={() => {
							onConfirm();
							setHasBeenClicked(true);
						}}
					>
						{confirmButtonText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default memo(forwardRef(ActionConfirmModal));
