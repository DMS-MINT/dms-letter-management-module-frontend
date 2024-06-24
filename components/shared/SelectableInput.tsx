"use client";
import {
  addParticipant,
  removeParticipant,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ContactType } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { useEffect, useState } from "react";
import Select, { ActionMeta } from "react-select";
import Creatable from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

interface ISelectableInputProps {
  options: ContactType[];
  name: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
  placeholder: string;
  defaultValue?: ContactType[];
}

export default function SelectableInput({
  isCreatable,
  isMulti,
  ...rest
}: ISelectableInputProps) {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  const handleSingleSelectChange = (
    option: ContactType | null,
    actionMeta: ActionMeta<ContactType>
  ) => {
    const { action, name, removedValues } = actionMeta;
    const role = name as ParticipantRolesEnum;

    const handleSelectOption = (option: ContactType) => {
      dispatch(addParticipant({ id: uuidv4(), user: option, role }));
    };

    const handleClear = (removedValues: ContactType[]) => {
      removedValues.forEach((removedValue) => {
        const user_id = removedValue.id;
        dispatch(removeParticipant(user_id));
      });
    };

    switch (action) {
      case "select-option":
        if (option) handleSelectOption(option);
        break;
      case "clear":
        if (removedValues) handleClear(removedValues as ContactType[]);
        break;
      default:
        break;
    }
  };

  const handleMultiSelectChange = (
    option: readonly ContactType[],
    actionMeta: ActionMeta<ContactType>
  ) => {
    const {
      action,
      name,
      removedValues,
      option: selectedOption,
      removedValue,
    } = actionMeta;
    const role = name as ParticipantRolesEnum;

    const handleSelectOption = (selectedOption: ContactType) => {
      dispatch(addParticipant({ id: uuidv4(), user: selectedOption, role }));
    };

    const handleCreateOption = (selectedOption: ContactType) => {
      const { value } = selectedOption as unknown as { value: string };
      const user_type = "guest";
      dispatch(
        addParticipant({
          id: "__New__",
          user: { id: "__New__", name: value, user_type },
          role,
        })
      );
    };

    const handleRemoveValue = (removedValue: ContactType) => {
      const user_id = removedValue.id;

      if (user_id) {
        dispatch(removeParticipant(user_id));
      } else {
        const { value } = removedValue as unknown as { value: string };
        dispatch(removeParticipant(value));
      }
    };

    const handleClear = (removedValues: ContactType[]) => {
      removedValues.forEach((removedValue) => {
        const user_id = removedValue.id;

        if (user_id) {
          dispatch(removeParticipant(user_id));
        } else {
          const { value } = removedValue as unknown as { value: string };
          dispatch(removeParticipant(value));
        }
      });
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
      case "clear":
        if (removedValues) handleClear(removedValues as ContactType[]);
        break;
      default:
        break;
    }
  };

  const isContactType = (
    option: ContactType | { label: string; value: string }
  ): option is ContactType => {
    return (option as ContactType).user_type !== undefined;
  };

  const getLabel = (
    option: ContactType | { label: string; value: string }
  ): string => {
    if (isContactType(option)) {
      if (option.user_type === "member") {
        return `${option.full_name} - ${option.job_title}`;
      } else if (option.user_type === "guest") {
        return `${option.name}`;
      }
    }
    return `${option.label}`;
  };

  const getValue = (
    option: ContactType | { label: string; value: string }
  ): string => {
    if (isContactType(option)) {
      if (option.user_type === "member") {
        return option.id;
      } else if (option.user_type === "guest") {
        return option.name;
      }
    }
    return `${option.value}`;
  };

  const SelectableInputToRender = isCreatable ? Creatable : Select;

  return isMulti ? (
    <SelectableInputToRender
      isMulti={true}
      isClearable={true}
      {...rest}
      onChange={handleMultiSelectChange}
      getOptionLabel={getLabel}
      getOptionValue={getValue}
      className="w-full"
    />
  ) : (
    <SelectableInputToRender
      isMulti={false}
      isClearable={true}
      {...rest}
      onChange={handleSingleSelectChange}
      getOptionLabel={getLabel}
      getOptionValue={getValue}
      className="w-full"
    />
  );
}
