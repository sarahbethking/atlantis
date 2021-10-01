import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { debounce } from "lodash";
import styles from "./InternalChipDismissible.css";
import { ChipProps } from "../Chip";
import { Text } from "../../Text";

interface ChipDismissibleInputProps {
  readonly options: ChipProps[];
  onEmptyBackspace(): void;
  onTab(value: string): void;
  onEnter(value: string): void;
  onBlur(value: string): void;
}

export function InternalChipDismissibleInput({
  options,
  onEmptyBackspace,
  onTab,
  onEnter,
  onBlur,
}: ChipDismissibleInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [shouldCancelBlur, setShouldCancelBlur] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={debounce(handleBlur, 200)}
        onFocus={() => setMenuOpen(true)}
        autoFocus={true}
      />

      {menuOpen && (
        <div className={styles.menu}>
          {options.map(option => {
            return (
              <button
                key={option.value}
                className={styles.menuOption}
                onClick={handleOptionClick(option.value)}
                onMouseDown={() => setShouldCancelBlur(true)}
                onMouseUp={() => setShouldCancelBlur(false)}
              >
                {option.prefix}
                <Text>{option.label}</Text>
              </button>
            );
          })}
        </div>
      )}
    </>
  );

  function handleBlur() {
    if (shouldCancelBlur) return;
    setMenuOpen(false);
    onBlur(searchValue);
  }

  function handleOptionClick(value: string) {
    return () => {
      inputRef.current?.focus();
      console.log(value);
    };
  }

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
