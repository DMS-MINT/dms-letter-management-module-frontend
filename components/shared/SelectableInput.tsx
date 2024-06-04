import {
  addParticipant,
  removeParticipant,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IOption } from "@/typing";
import { ParticipantRolesEnum } from "@/typing";
import { optionToContact } from "@/utils";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import Creatable from "react-select/creatable";

interface ISelectableInputProps {
  options: IOption[];
  role: number;
  defaultValue: IOption[];
  isCreatable?: boolean;
  isMulti?: boolean;
}

export default function SelectableInput({
  options,
  role,
  defaultValue,
  isCreatable = false,
  isMulti = false,
}: ISelectableInputProps) {
  const dispatch = useAppDispatch();

  const handleSelectChange = (
    option: SingleValue<IOption> | MultiValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => {
    const { action, name, option: selectedOption, removedValue } = actionMeta;
    const role = name as string;

    const handleSelectOption = (selectedOption: IOption) => {
      const user = optionToContact(selectedOption);
      dispatch(addParticipant({ role, user }));
    };

    const handleCreateOption = (selectedOption: IOption) => {
      const user_type = "guest";
      const user = optionToContact({ ...selectedOption, user_type });
      dispatch(addParticipant({ role, user }));
    };

    const handleRemoveValue = (removedValue: IOption) => {
      const user = optionToContact(removedValue);
      dispatch(removeParticipant({ role, user }));
    };

    switch (action) {
      case "select-option":
        if (selectedOption) handleSelectOption(selectedOption);
        break;
      case "create-option":
        if (selectedOption) handleCreateOption(selectedOption);
        break;
      case "remove-value":
        if (removedValue) handleRemoveValue(removedValue);
        break;
      default:
        break;
    }
  };

  const SelectableInputToRender = isCreatable ? Creatable : Select;

  const getRoleKeyByValue = (value: number): string | undefined => {
    return ParticipantRolesEnum[value];
  };

  return (
    <SelectableInputToRender
      options={options}
      onChange={handleSelectChange}
      name={getRoleKeyByValue(role)}
      defaultValue={defaultValue}
      isMulti={isMulti}
      className="w-full"
    />
  );
}
