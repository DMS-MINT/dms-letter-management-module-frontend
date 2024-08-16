import { DropdownButton } from "@/components/BlockEditor/ui/Dropdown";
import { Icon } from "@/components/BlockEditor/ui/Icon";
import { Surface } from "@/components/BlockEditor/ui/Surface";
import { Toolbar } from "@/components/BlockEditor/ui/Toolbar";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";

const FONT_SIZES = [
	{ label: "8", value: "8px" },
	{ label: "9", value: "9px" },
	{ label: "10", value: "10px" },
	{ label: "11", value: "11px" },
	{ label: "12", value: "12px" },
	{ label: "14", value: "14px" },
	{ label: "18", value: "18px" },
	{ label: "24", value: "24px" },
	{ label: "30", value: "30px" },
	{ label: "36", value: "36px" },
	{ label: "48", value: "48px" },
	{ label: "60", value: "60px" },
	{ label: "72", value: "72px" },
	{ label: "96", value: "96px" },
];

export type FontSizePickerProps = {
	onChange: (value: string) => void; // eslint-disable-line no-unused-vars
	value: string;
};

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
	const currentValue = FONT_SIZES.find((size) => size.value === value);
	const currentSizeLabel = currentValue?.label || "11";

	const selectSize = useCallback(
		(size: string) => () => onChange(size),
		[onChange]
	);

	return (
		<Dropdown.Root>
			<Dropdown.Trigger asChild>
				<Toolbar.Button active={!!currentValue?.value}>
					{currentSizeLabel}
					<Icon name="ChevronDown" className="h-2 w-2" />
				</Toolbar.Button>
			</Dropdown.Trigger>
			<Dropdown.Content asChild>
				<Surface className="flex flex-col gap-1 px-2 py-4">
					{FONT_SIZES.map((size) => (
						<DropdownButton
							isActive={value === size.value}
							onClick={selectSize(size.value)}
							key={`${size.label}_${size.value}`}
						>
							<span style={{ fontSize: size.value }}>{size.label}</span>
						</DropdownButton>
					))}
				</Surface>
			</Dropdown.Content>
		</Dropdown.Root>
	);
};
