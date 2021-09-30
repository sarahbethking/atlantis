import React, { ChangeEvent, MouseEvent, useState } from "react";
import { ChipDismissible } from ".";
import styles from "./InternalChip.css";
import { ChipDismissibleProps } from "./ChipsTypes";

export function InternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: ChipDismissibleProps) {
  const [searchValue, setSearchValue] = useState("");
  const visibleChipOptions = children
    .map(chip => chip.props)
    .filter(chip => selected.includes(chip.value));

  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {visibleChipOptions.map(chip => {
        return (
          <ChipDismissible
            key={chip.value}
            {...chip}
            onClick={handleChipClick(chip.value)}
            onRequestRemove={handleChipRemove(chip.value)}
          />
        );
      })}

      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      handleChipAdd(searchValue);
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value);
  }

  function handleChipRemove(value: string) {
    return () => onChange(selected.filter(val => val !== value));
  }

  function handleChipAdd(value: string) {
    setSearchValue("");
    onCustomAdd(value);
  }

  function handleChipClick(value: string) {
    if (onClick === undefined) return;
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
  }
}
