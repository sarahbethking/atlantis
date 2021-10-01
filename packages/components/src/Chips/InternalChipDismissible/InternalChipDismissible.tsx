import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./InternalChipDismissible.css";
import { ChipDismissible } from "..";
import { ChipDismissibleProps } from "../ChipsTypes";
import { Button } from "../../Button";

export function InternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: ChipDismissibleProps) {
  const [searchValue, setSearchValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
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

      {inputVisible ? (
        <input
          className={styles.input}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onBlur={() => !searchValue && setInputVisible(false)}
          autoFocus={true}
        />
      ) : (
        <Button
          icon="add"
          type="secondary"
          size="small"
          ariaLabel="Add" // FIXME
          onClick={() => setInputVisible(true)}
        />
      )}
    </div>
  );

  function handleChipRemove(value: string) {
    return () => onChange(selected.filter(val => val !== value));
  }

  // function handleChipAdd(value: string) {
  //   setSearchValue("");
  //   onChange([...selected, value]);
  // }

  function handleCustomAdd(value: string) {
    setSearchValue("");
    onCustomAdd(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Backspace" &&
      selected.length &&
      searchValue.length === 0
    ) {
      handleChipRemove(selected[selected.length - 1])();
    }

    if ((event.key === "Tab" || event.key === "Enter") && searchValue.length) {
      event.preventDefault();
      handleCustomAdd(searchValue);
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value);
  }

  function handleChipClick(value: string) {
    if (onClick === undefined) return;
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
  }
}
