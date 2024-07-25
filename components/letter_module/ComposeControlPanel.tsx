export default function ComposeControlPanel() {
	// useEffect(() => {
	// 	dispatch(toggleDrawerVisibility(true));
	// }, []);

	// useEffect(() => {
	// 	setContentJson([
	// 		{ content: letterDetails?.content ? letterDetails?.content : "" },
	// 	]);
	// }, [letterDetails]);

	// const dispatchCreateLetter = () => {
	// 	if (letterDetails) {
	// 		const composeFormData = letterSerializer(
	// 			letterDetails,
	// 			attachments,
	// 			letterDetails.signature
	// 		);
	// 		dispatch(createLetter(composeFormData));
	// 	}
	// };

	// useEffect(() => {
	// 	if (
	// 		status === RequestStatusEnum.FULFILLED &&
	// 		letterDetails?.reference_number
	// 	) {
	// 		const category =
	// 			letterDetails?.current_state === "Draft" ? "draft" : "outbox";
	// 		router.push(`/letters/${category}/${letterDetails?.reference_number}`);
	// 	}
	// }, [status, letterDetails]);

	return (
		<section className="flex items-center justify-between w-full sticky top-0">
			<div className="flex gap-2">
				<h1 className="page-title">አዲስ ደብዳቤ </h1>
			</div>
			{/* <div className="flex items-center gap-3">
				{letterDetails?.letter_type === "incoming" ? null : <PrintPreviewButton />}
				<Button
					className="mr-0 RECIPIENTborder-gray-300 rounded-md"
					variant="outline"
					onClick={dispatchCreateLetter}
				>
					ረቂቁን ያስቀምጡ
				</Button>
				{letterDetails?.letter_type === "incoming" ? (
					<SubmitLetterForm action="create_and_publish" />
				) : (
					<SubmitLetterForm action="create_and_submit" />
				)}
			</div> */}
		</section>
	);
}
