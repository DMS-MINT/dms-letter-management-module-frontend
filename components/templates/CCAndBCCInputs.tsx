import { SelectableInput } from "@/components/forms";
import { RoleEnum } from "@/types/letter_module";

export default function CCAndBCCInputs() {
	return (
		<>
			<div className="mt-auto py-3 font-serif">
				<p>እንዲያውቁት:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<SelectableInput
							name={RoleEnum["BLIND CARBON COPY RECIPIENT"]}
							isClearable={true}
							placeholder="እባክዎ ስለ ደብዳቤው እንዲያውቁ የሚገባቸውን ሰዎች ይምረጡ"
							orientation="vertical"
							prefix="ለ"
						/>
					</div>
				</ul>
			</div>
			<div className="py-3 font-serif">
				<p>ግልባጭ:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<SelectableInput
							name={RoleEnum["CARBON COPY RECIPIENT"]}
							isClearable={true}
							placeholder="እባክዎ የደብዳቤው ግልባጭ የሚላክላቸውን ሰዎች ይምረጡ"
							orientation="vertical"
							prefix="ለ"
						/>
					</div>
				</ul>
			</div>
		</>
	);
}
