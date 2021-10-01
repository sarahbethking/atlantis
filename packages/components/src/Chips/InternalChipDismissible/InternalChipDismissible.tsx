import React, { MouseEvent, useState } from "react";
import styles from "./InternalChipDismissible.css";
import { InternalChipDismissibleInput } from "./InternalChipDismissibleInput";
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
        <InternalChipDismissibleInput
          onEmptyBackspace={handleEmptyBackspace}
          onTab={handleCustomAdd}
          onEnter={handleCustomAdd}
          onBlur={value => !value && setInputVisible(false)}
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

  function handleEmptyBackspace() {
    handleChipRemove(selected[selected.length - 1])();
  }

  function handleChipRemove(value: string) {
    return () => onChange(selected.filter(val => val !== value));
  }

  // function handleChipAdd(value: string) {
  //   setSearchValue("");
  //   onChange([...selected, value]);
  // }

  function handleCustomAdd(value: string) {
    onCustomAdd(value);
  }

  function handleChipClick(value: string) {
    if (onClick === undefined) return;
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
  }
}
