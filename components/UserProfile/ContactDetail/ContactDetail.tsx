import { getContacts } from "@/actions/user_module/action";
import { ContactType } from "@/types/user_module";
import { useEffect, useState } from "react";
import ContactTable from "./ContactTable";

const ContactDetail = () => {
	const [contacts, setContacts] = useState<ContactType[]>([]);

	const fetchContacts = async () => {
		const result = await getContacts();
		if (result.ok) {
			setContacts(result.message);
		} else {
			console.error("Error fetching contacts:", result.message);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<div>
			<ContactTable contacts={contacts} refetchContacts={fetchContacts} />
		</div>
	);
};

export default ContactDetail;
