import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type OptionItemProps = {
	imageSrc?: string | null | undefined;
	primaryText: string;
	secondaryText: string;
};

export default function OptionItem({
	imageSrc,
	primaryText,
	secondaryText,
}: OptionItemProps) {
	return (
		<div className="flex items-center gap-2">
			<Avatar className="">
				<AvatarImage src={imageSrc || ""} />
				<AvatarFallback className="bg-blue-200 text-sm">
					{primaryText.substring(0, 2)}
				</AvatarFallback>
			</Avatar>
			<div>
				<p>{primaryText}</p>
				<p className="text-sm text-gray-600">{secondaryText}</p>
			</div>
		</div>
	);
}
