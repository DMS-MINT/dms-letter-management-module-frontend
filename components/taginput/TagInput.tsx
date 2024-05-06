import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";

export default function TagInput() {
  const [selected, setSelected] = useState([]);

  function onAdd(newTag: number) {
    setSelected([...selected, newTag]);
  }
  const onDelete = useCallback(
    (index: number) => {
      setSelected(selected.filter((_, i) => i !== index));
    },
    [selected]
  );

  return (
    <>
      <p>Enter new tags meeting the requirements below:</p>
      <ReactTags
        allowNew
        ariaDescribedBy="custom-tags-description"
        collapseOnSelect
        id="custom-tags-demo"
        labelText="Enter new tags"
        onAdd={onAdd}
        onDelete={onDelete}
        selected={selected}
        suggestions={[]}
      />
      <p id="custom-tags-description" style={{ color: "gray" }}>
        <em>
          Tags must be between 4 and 12 characters in length and only contain
          the letters A-Z
        </em>
      </p>
    </>
  );
}
