"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import type { Ref } from "react";
import {
	forwardRef,
	memo,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import { Textarea } from "../ui/textarea";

export type ActionConfirmModalRef = {
	getOTP: () => number;
	message: string;
};

type ActionConfirmModalProps = {
	triggerButtonIcon?: React.ReactNode;

	disabledButton?: boolean;
	triggerButtonText: string;
	triggerButtonVariant: "default" | "destructive" | "outline" | "third";
	requriresMessage?: boolean;
	dialogTitle: string;
	dialogDescription: string;
	confirmButtonText: string;
	cancelButtonText: string;
	onConfirm: () => void;
	requiresAuth: boolean;
};

function ActionConfirmModal(
	{
		triggerButtonIcon,
		disabledButton,
		triggerButtonText,
		triggerButtonVariant,
		dialogTitle,
		dialogDescription,
		confirmButtonText,
		cancelButtonText,
		onConfirm,
		requiresAuth,
		requriresMessage,
	}: ActionConfirmModalProps,
	ref: Ref<ActionConfirmModalRef>
) {
	const { form, getOTP, handleInputChange } = useOTP();
	const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	useImperativeHandle(ref, () => ({
		getOTP,
		message,
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
					disabled={disabledButton}
					className="flex gap-2"
					size="sm"
				>
					{triggerButtonIcon && triggerButtonIcon}
					{triggerButtonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col rounded-md bg-white p-4 shadow-lg">
				<DialogHeader className="flex-1 p-2">
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				{requriresMessage ? (
					<Textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="እባክዎን ያልተቀበሉበትን ምክንያት ያብራሩ።."
					/>
				) : null}
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
