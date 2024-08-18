export const getInitials = (name: string) => {
	const nameParts = name.split(" ");
	if (nameParts.length === 1) {
		return nameParts[0].charAt(0).toUpperCase();
	} else if (nameParts.length > 1) {
		return (
			nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()
		);
	}
	return "";
};
