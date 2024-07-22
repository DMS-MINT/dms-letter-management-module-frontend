"use client";

import { Button } from "@/components/ui/button";
import { getActionButtonConfigs } from "@/utils";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LetterDetailResponseType } from "@/types/letter_module";
import { useWorkflowDispatcher } from "@/hooks";
import type { PropType } from "@/hooks";
import type { ButtonConfigType } from "@/utils";

export default function ActionButtons({
	data,
}: {
	data: LetterDetailResponseType;
}) {
	const { mutate } = useWorkflowDispatcher();
	const [buttonConfigs, setButtonConfigs] = useState<ButtonConfigType[]>([]);

	const handleClick = (action: PropType) => {
		mutate(action);
	};

	useEffect(() => {
		const configs = getActionButtonConfigs(data);
		setButtonConfigs(configs);
	}, [data]);

	return (
		<>
			{buttonConfigs
				.filter((action) => action.isVisible === true)
				.map(({ label, icon, variant, size, style, action, isButton, component }) =>
					isButton ? (
						<Button
							key={uuidv4()}
							variant={variant}
							size={size}
							className={style}
							onClick={action}
						>
							{label}
							{icon}
						</Button>
					) : (
						<React.Fragment key={uuidv4()}>{component}</React.Fragment>
					)
				)}
		</>
	);
}
