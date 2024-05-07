import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { suggestions } from "./names";
interface ISelected {
  value: number;
  label: string;
}
export default function TagInput() {
  const [selected, setSelected] = useState<ISelected[]>([]);

  const onAdd = useCallback(
    (newTag: any) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  return (
    <ReactTags
      placeholderText=""
      selected={selected}
      suggestions={suggestions}
      onAdd={onAdd}
      onDelete={onDelete}
      noOptionsText="No matching names"
    />
  );
}
