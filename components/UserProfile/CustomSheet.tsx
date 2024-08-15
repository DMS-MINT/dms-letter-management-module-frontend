import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

// types.ts
export type Contact = {
	id: number;
	fullName: string;
	fullNameAmharic: string;
	address: string;
	addressAmharic: string;
	phone: string;
	email: string;
	organization: string;
	organizationAmharic: string;
	photo?: string; // URL or base64 string
};

type CustomSheetProps = {
	isOpen: boolean;
	onClose: () => void;
	contact: Contact | null;
	isAdding: boolean;
	onSave: (contact: Contact) => void;
};

export function CustomSheet({
	isOpen,
	onClose,
	contact,
	isAdding,
	onSave,
}: CustomSheetProps) {
	const [formData, setFormData] = useState<Contact>({
		id: contact?.id || Date.now(), // Use contact ID or generate a new one
		fullName: contact?.fullName || "",
		fullNameAmharic: contact?.fullNameAmharic || "",
		address: contact?.address || "",
		addressAmharic: contact?.addressAmharic || "",
		phone: contact?.phone || "",
		email: contact?.email || "",
		organization: contact?.organization || "",
		organizationAmharic: contact?.organizationAmharic || "",
		photo: contact?.photo || "",
	});

	useEffect(() => {
		if (contact) {
			setFormData(contact);
		} else {
			setFormData({
				id: Date.now(),
				fullName: "",
				fullNameAmharic: "",
				address: "",
				addressAmharic: "",
				phone: "",
				email: "",
				organization: "",
				organizationAmharic: "",
				photo: "",
			});
		}
	}, [contact, isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="max-w-lg p-6">
				<SheetHeader>
					<SheetTitle>{isAdding ? "Add Contact" : "Edit Contact"}</SheetTitle>
				</SheetHeader>

				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Input
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							placeholder="Full Name"
							required
						/>
						<Input
							name="fullNameAmharic"
							value={formData.fullNameAmharic}
							onChange={handleChange}
							placeholder="Full Name (Amharic)"
						/>
						<Input
							name="address"
							value={formData.address}
							onChange={handleChange}
							placeholder="Address"
						/>
						<Input
							name="addressAmharic"
							value={formData.addressAmharic}
							onChange={handleChange}
							placeholder="Address (Amharic)"
						/>
						<Input
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="Phone"
						/>
						<Input
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
						/>
						<Input
							name="organization"
							value={formData.organization}
							onChange={handleChange}
							placeholder="Organization"
						/>
						<Input
							name="organizationAmharic"
							value={formData.organizationAmharic}
							onChange={handleChange}
							placeholder="Organization (Amharic)"
						/>

						<Input id="photo" type="file" onChange={handleChange} />
					</div>
					<div className="mt-4 flex justify-end gap-2">
						<Button type="button" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">{isAdding ? "Add" : "Save"}</Button>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
