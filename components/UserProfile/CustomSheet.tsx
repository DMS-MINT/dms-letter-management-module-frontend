import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { ContactTypeWithImage } from "@/types/user_module";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";

// Custom validation for image file types
const imageFileSchema = z
	.instanceof(File)
	.refine((file) => file.type.startsWith("image/"), {
		message: "Only image files are allowed (JPEG, PNG, GIF, etc.)",
	});

const contactSchema = z.object({
	fullName: z.string().min(1, { message: "Full Name is required" }),
	fullNameAmharic: z.string().optional(),
	address: z.string().optional(),
	addressAmharic: z.string().optional(),
	phone: z
		.string()
		.min(10, { message: "Phone number must be at least 10 digits" }),
	email: z.string().email({ message: "Invalid email address" }),
	photo: z.union([imageFileSchema, z.string().optional()]), // Either a File or a string URL
});

type CustomSheetProps = {
	isOpen: boolean;
	onClose: () => void;
	contact: ContactTypeWithImage | null;
	isAdding: boolean;
	onSave: (contact: ContactTypeWithImage) => void;
};

export function CustomSheet({
	isOpen,
	onClose,
	contact,
	isAdding,
	onSave,
}: CustomSheetProps) {
	const [preview, setPreview] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<ContactTypeWithImage>({
		defaultValues: {
			fullName: contact?.fullName || "",
			fullNameAmharic: contact?.fullNameAmharic || "",
			address: contact?.address || "",
			addressAmharic: contact?.addressAmharic || "",
			phone: contact?.phone || "",
			email: contact?.email || "",
			photo: contact?.photo || null,
		},
		resolver: zodResolver(contactSchema),
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setValue("photo", file);
			setPreview(URL.createObjectURL(file)); // Create a preview URL
		}
	};

	useEffect(() => {
		if (contact) {
			reset({
				...contact,
				photo: contact.photo ? contact.photo : null,
			});

			// Set the preview if the photo is a string (URL)
			if (typeof contact.photo === "string") {
				setPreview(contact.photo);
			} else {
				setPreview(null);
			}
		} else {
			reset({
				fullName: "",
				fullNameAmharic: "",
				address: "",
				addressAmharic: "",
				phone: "",
				email: "",
				photo: null,
			});
			setPreview(null);
		}
	}, [contact, isOpen, reset]);

	const onSubmit = (data: ContactTypeWithImage) => {
		onSave(data);
		onClose();
	};

	// Clean up the preview URL when the component unmounts
	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="max-w-lg pr-0">
				<SheetHeader>
					<SheetTitle>{isAdding ? "አዲስ እውቂያ" : "እውቂያን ማረሚያ"}</SheetTitle>
					<SheetDescription>እውቂያዎችን በሚገባው መረጃ ላይ ያስገቡ።</SheetDescription>
				</SheetHeader>
				<div className="my-4 h-[90%] overflow-y-auto  pr-4">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-2">
							<div>
								<Label htmlFor="photo">Photo</Label>
								<Input
									id="photo"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
								/>
								{errors.photo && (
									<p className="text-sm text-red-500">{errors.photo.message}</p>
								)}
								{preview && (
									<img src={preview} alt="Selected preview" className="mt-2 max-h-40" />
								)}
							</div>
							<div>
								<Label htmlFor="fullName">Full Name</Label>
								<Input {...register("fullName")} placeholder="Full Name - English" />
								{errors.fullName && (
									<p className="text-sm text-red-500">{errors.fullName.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="fullNameAmharic">ስም</Label>
								<Input {...register("fullNameAmharic")} placeholder="ስም - አማርኛ" />
							</div>
							<div>
								<Label htmlFor="address">Address</Label>
								<Input {...register("address")} placeholder="Address - English" />
							</div>
							<div>
								<Label htmlFor="addressAmharic">አድራሻ</Label>
								<Input {...register("addressAmharic")} placeholder="አድራሻ - አማርኛ" />
							</div>
							<div>
								<Label htmlFor="phone">Phone Number</Label>
								<Input {...register("phone")} placeholder="ስልክ ቁጥር - አማርኛ" />
								{errors.phone && (
									<p className="text-sm text-red-500">{errors.phone.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input {...register("email")} placeholder="Email - English" />
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
