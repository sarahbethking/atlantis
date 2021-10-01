import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./InternalChipDismissible.css";

interface ChipDismissibleInputProps {
  onEmptyBackspace(): void;
  onTab(value: string): void;
  onEnter(value: string): void;
  onBlur(value: string): void;
}

export function InternalChipDismissibleInput({
  onEmptyBackspace,
  onTab,
  onEnter,
  onBlur,
}: ChipDismissibleInputProps) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={() => onBlur(searchValue)}
        autoFocus={true}
      />
    </>
  );

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && searchValue.length === 0) {
      return onEmptyBackspace();
    }

    if (searchValue.length) {
      if (event.key === "Tab") {
        event.preventDefault();
        setSearchValue("");
        return onTab(searchValue);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        setSearchValue("");
        return onEnter(searchValue);
      }
    }
  }
}
