import { BubbleMenu, type Editor } from "@tiptap/react";
import { memo } from "react";
import { Icon } from "../../ui/Icon";
import { Toolbar } from "../../ui/Toolbar";
import { ContentTypePicker } from "./components/ContentTypePicker";
import { FontSizePicker } from "./components/FontSizePicker";
import useTextMenuCommands from "./hooks/useTextMenuCommands";
import useTextMenuStates from "./hooks/useTextMenuStates";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";

const MemoButton = memo(Toolbar.Button);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
	editor: Editor;
};

export default function TextMenu({ editor }: TextMenuProps) {
	const commands = useTextMenuCommands(editor);
	const states = useTextMenuStates(editor);
	const blockOptions = useTextmenuContentTypes(editor);

	return (
		<BubbleMenu
			tippyOptions={{ popperOptions: { placement: "top-start" } }}
			editor={editor}
			pluginKey="textMenu"
			shouldShow={states.shouldShow}
			updateDelay={100}
		>
			<Toolbar.Wrapper>
				<MemoContentTypePicker options={blockOptions} />
				{/* <MemoFontFamilyPicker
					onChange={commands.onSetFont}
					value={states.currentFont || ""}
				/> */}
				<MemoFontSizePicker
					onChange={commands.onSetFontSize}
					value={states.currentSize || ""}
				/>
				<MemoButton
					tooltip="Bold"
					tooltipShortcut={["Mod", "B"]}
					onClick={commands.onBold}
					active={states.isBold}
				>
					<Icon name="Bold" />
				</MemoButton>
				<MemoButton
					tooltip="Italic"
					tooltipShortcut={["Mod", "I"]}
					onClick={commands.onItalic}
					active={states.isItalic}
				>
					<Icon name="Italic" />
				</MemoButton>
				<MemoButton
					tooltip="Underline"
					tooltipShortcut={["Mod", "U"]}
					onClick={commands.onUnderline}
					active={states.isUnderline}
				>
					<Icon name="Underline" />
				</MemoButton>
				<MemoButton
					tooltip="Strikehrough"
					tooltipShortcut={["Mod", "Shift", "S"]}
					onClick={commands.onStrike}
					active={states.isStrike}
				>
					<Icon name="Strikethrough" />
				</MemoButton>
				<MemoButton
					tooltip="Code"
					tooltipShortcut={["Mod", "E"]}
					onClick={commands.onCode}
					active={states.isCode}
				>
					<Icon name="Code" />
				</MemoButton>
				{/* <MemoButton tooltip="Code block" onClick={commands.onCodeBlock}>
					<Icon name="Code2" />
				</MemoButton> */}
				{/* END */}

				{/* <EditLinkPopover onSetLink={commands.onLink} /> */}
				{/* <Popover.Root>
					<Popover.Trigger asChild>
						<MemoButton active={!!states.currentHighlight} tooltip="Highlight text">
							<Icon name="Highlighter" />
						</MemoButton>
					</Popover.Trigger>
					<Popover.Content side="top" sideOffset={8} asChild>
						<Surface className="p-1">
							<MemoColorPicker
								color={states.currentHighlight}
								onChange={commands.onChangeHighlight}
								onClear={commands.onClearHighlight}
							/>
						</Surface>
					</Popover.Content>
				</Popover.Root>
				<Popover.Root>
					<Popover.Trigger asChild>
						<MemoButton active={!!states.currentColor} tooltip="Text color">
							<Icon name="Palette" />
						</MemoButton>
					</Popover.Trigger>
					<Popover.Content side="top" sideOffset={8} asChild>
						<Surface className="p-1">
							<MemoColorPicker
								color={states.currentColor}
								onChange={commands.onChangeColor}
								onClear={commands.onClearColor}
							/>
						</Surface>
					</Popover.Content>
				</Popover.Root>
				<Popover.Root>
					<Popover.Trigger asChild>
						<MemoButton tooltip="More options">
							<Icon name="MoreVertical" />
						</MemoButton>
					</Popover.Trigger>
					<Popover.Content side="top" asChild>
						<Toolbar.Wrapper>
							<MemoButton
								tooltip="Subscript"
								tooltipShortcut={["Mod", "."]}
								onClick={commands.onSubscript}
								active={states.isSubscript}
							>
								<Icon name="Subscript" />
							</MemoButton>
							<MemoButton
								tooltip="Superscript"
								tooltipShortcut={["Mod", ","]}
								onClick={commands.onSuperscript}
								active={states.isSuperscript}
							>
								<Icon name="Superscript" />
							</MemoButton>
							<Toolbar.Divider />
							<MemoButton
								tooltip="Align left"
								tooltipShortcut={["Shift", "Mod", "L"]}
								onClick={commands.onAlignLeft}
								active={states.isAlignLeft}
							>
								<Icon name="AlignLeft" />
							</MemoButton>
							<MemoButton
								tooltip="Align center"
								tooltipShortcut={["Shift", "Mod", "E"]}
								onClick={commands.onAlignCenter}
								active={states.isAlignCenter}
							>
								<Icon name="AlignCenter" />
							</MemoButton>
							<MemoButton
								tooltip="Align right"
								tooltipShortcut={["Shift", "Mod", "R"]}
								onClick={commands.onAlignRight}
								active={states.isAlignRight}
							>
								<Icon name="AlignRight" />
							</MemoButton>
							<MemoButton
								tooltip="Justify"
								tooltipShortcut={["Shift", "Mod", "J"]}
								onClick={commands.onAlignJustify}
								active={states.isAlignJustify}
							>
								<Icon name="AlignJustify" />
							</MemoButton>
						</Toolbar.Wrapper>
					</Popover.Content>
				</Popover.Root> */}
			</Toolbar.Wrapper>
		</BubbleMenu>
	);
}
