import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { ContactType } from "@/types/user_module";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";

const contactSchema = z.object({
	full_name_en: z
		.string()
		.min(1, { message: "Full Name (English) is required" }),
	full_name_am: z
		.string()
		.min(1, { message: "Full Name (Amharic) is required" }),
	address: z.object({
		city_en: z.string().min(1, { message: "Address (English) is required" }),
		city_am: z.string().min(1, { message: "Address (Amharic) is required" }),
	}),
	phone_number: z
		.string()
		.regex(
			/^\+2519\d{8}$/,
			"Phone number must start with +2519 and be 13 digits long"
		),
	email: z.string().email({ message: "Invalid email address" }),
});

type CustomSheetProps = {
	isOpen: boolean;
	onClose: () => void;
	contact: ContactType | null;
	isAdding: boolean;
	onSave: (contact: ContactType) => void;
};

export function CustomSheet({
	isOpen,
	onClose,
	contact,
	isAdding,
	onSave,
}: CustomSheetProps) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<ContactType>({
		defaultValues: {
			full_name_en: contact?.full_name_en || "",
			full_name_am: contact?.full_name_am || "",
			address: {
				city_en: contact?.address?.city_en || "",
				city_am: contact?.address?.city_am || "",
			},
			phone_number: contact?.phone_number || 0,
			email: contact?.email || "",
		},
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = (data: ContactType) => {
		// Convert phone_number to string if needed before saving
		data.phone_number = Number(data.phone_number);
		onSave(data);
		onClose();
	};
	useEffect(() => {
		if (contact) {
			reset({
				...contact,
			});
		} else {
			reset({
				full_name_en: "",
				full_name_am: "",
				address: {
					city_en: "",
					city_am: "",
				},
				phone_number: 0,
				email: "",
			});
		}
	}, [contact, isOpen, reset]);
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="max-w-lg pr-0">
				<SheetHeader>
					<SheetTitle>{isAdding ? "Add Contact" : "Edit Contact"}</SheetTitle>
					<SheetDescription>
						Fill in the contact details accurately.
					</SheetDescription>
				</SheetHeader>
				<div className="my-4 h-[90%] overflow-y-auto pr-4">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-2">
							<div>
								<Label htmlFor="full_name_en">Full Name (English)</Label>
								<Input
									{...register("full_name_en")}
									placeholder="Full Name - English"
								/>
								{errors.full_name_en && (
									<p className="text-sm text-red-500">{errors.full_name_en.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="full_name_am">ስም (አማርኛ)</Label>
								<Input {...register("full_name_am")} placeholder="ስም - አማርኛ" />
								{errors.full_name_am && (
									<p className="text-sm text-red-500">{errors.full_name_am.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="address_city_en">Address (English)</Label>
								<Input
									{...register("address.city_en")}
									placeholder="Address - English"
								/>
								{errors.address?.city_en && (
									<p className="text-sm text-red-500">
										{errors.address.city_en.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="address_city_am">አድራሻ (አማርኛ)</Label>
								<Input {...register("address.city_am")} placeholder="አድራሻ - አማርኛ" />
								{errors.address?.city_am && (
									<p className="text-sm text-red-500">
										{errors.address.city_am.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="phone_number">Phone Number</Label>
								<Input {...register("phone_number")} placeholder="ስልክ ቁጥር" />
								{errors.phone_number && (
									<p className="text-sm text-red-500">{errors.phone_number.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input {...register("email")} placeholder="Email" />
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>
						</div>
						<div className="mt-4 flex justify-end gap-2">
							<Button type="button" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">{isAdding ? "Add" : "Save"}</Button>
						</div>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
