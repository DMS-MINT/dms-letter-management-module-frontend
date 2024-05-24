"use client";

import CreatableSelect from "react-select/creatable";
import { ActionMeta } from "react-select";
import { useDispatch } from "react-redux";
import { addParticipant, removeParticipant } from "@/redux/slices/composeSlice";
import { RolesEnum } from "@/typing/enum";
import { IUserOptions } from "@/typing";
import { userOptions } from "@/data";

export default function page() {
  const dispatch = useDispatch();

  function handleChange(
    option: readonly IUserOptions[],
    actionMeta: ActionMeta<IUserOptions>
  ) {
    const { action, name, option: selectedOption, removedValue } = actionMeta;
    const role = Number(name);

    if (action === "select-option" && selectedOption) {
      const { value: id, label: name, user_type } = selectedOption;
      dispatch(addParticipant({ id, name, role, user_type }));
    } else if (action === "remove-value" && removedValue) {
      const { value: id, label: name, user_type } = removedValue;
      dispatch(removeParticipant({ id, name, role, user_type }));
    }
  }

  return (
    <div className="mx-20 p-10">
      <CreatableSelect
        isMulti
        name={String(RolesEnum.RECIPIENT)}
        options={userOptions}
        onChange={handleChange}
      />
    </div>
  );
}
