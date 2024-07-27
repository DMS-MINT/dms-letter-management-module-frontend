"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import SelectableInput from "./SelectableInput";
import { memo, useState } from "react";
import { Label } from "@radix-ui/react-label";

interface ISelectableInputGroup {
	groupName: string;
	labelText?: string;
	showLabel?: boolean;
}

function SelectableInputGroup({
	groupName,
	labelText = "ለ",
	showLabel = true,
}: ISelectableInputGroup) {
	const [inputCount, setInputCount] = useState<number>(1);

	const addInput = () => setInputCount((prevCount) => prevCount + 1);
	const removeInput = () => setInputCount((prevCount) => prevCount - 1);

	return (
		<div key={groupName} className="flex flex-col">
			{Array.from({ length: inputCount }).map((_, index) => (
				<div key={index} className="flex items-center gap-2">
					{showLabel ? <Label>{labelText}</Label> : null}
					<SelectableInput name={groupName} />
					{index > 0 ? (
						<Button
							size="icon"
							variant="outline"
							className="h-fit w-fit"
							onClick={removeInput}
						>
							<X size={25} />
						</Button>
					) : null}
					<Button
						size="icon"
						variant="outline"
						className="h-fit w-fit"
						onClick={addInput}
					>
						<Plus size={25} />
					</Button>
				</div>
			))}
		</div>
	);
}

export default memo(SelectableInputGroup);
