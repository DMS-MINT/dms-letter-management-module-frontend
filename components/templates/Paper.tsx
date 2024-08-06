export default function Paper({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className="flex min-h-[11in] w-[8.5in] flex-col border bg-white p-[10mm]">
			{children}
		</section>
	);
}
