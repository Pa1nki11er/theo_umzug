import React, { useState, useEffect, useRef, useId, useCallback } from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./index.module.css";
import Icon from "../../../../icon/Icon.jsx";
import classNames from "classnames";

// Icons can be imported from a separate file if reused elsewhere
const CursorGrowIcon = (props) => (
  <svg
    width="26"
    height="14"
    viewBox="0 0 24 14"
    fill="black"
    stroke="white"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
  </svg>
);

const PlusIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentcolor"
    strokeWidth="1.6"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
  </svg>
);

const MinusIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentcolor"
    strokeWidth="1.6"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 5H10" />
  </svg>
);

const NumberInput = ({
  title,
  iconName,
  value,
  idKey,
  onChange = () => {},
  classNameRemoving,
  onTransitionEnd,
}) => {
  const id = useId();
  const inputRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  // Sync local state with prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Using functional update to ensure latest state
  const handleIncrement = useCallback(() => {
    setLocalValue((prev) => {
      const updatedValue = prev + 1;
      onChange(updatedValue);
      return updatedValue;
    });
  }, [onChange]);

  const handleDecrement = useCallback(() => {
    setLocalValue((prev) => {
      const updatedValue = prev - 1;
      onChange(updatedValue);
      return updatedValue;
    });
  }, [onChange]);

  return (
    <div
      className={classNames(styles.Container, classNameRemoving)}
      id={idKey}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={styles.NumberInputPart}>
        <Icon
          iconName={iconName}
          alt="icon"
          style={{
            width: "45px",
            height: "45px",
            marginLeft: "20px",
            marginTop: "3px",
          }}
        />
        <label htmlFor={id} className={styles.Label}>
          {title}
        </label>
      </div>
      <div className={styles.NumberInputPart}>
        <NumberField.Root id={id} className={styles.Field}>
          <NumberField.ScrubArea className={styles.ScrubArea}>
            <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
              <CursorGrowIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>
          <NumberField.Group className={styles.Group}>
            <NumberField.Decrement
              className={styles.Decrement}
              onClick={handleDecrement}
              aria-label="Decrement value"
            >
              <MinusIcon />
            </NumberField.Decrement>
            <NumberField.Input
              className={styles.Input}
              ref={inputRef}
              value={localValue}
              disabled={true}
            />
            <NumberField.Increment
              className={styles.Increment}
              onClick={handleIncrement}
              aria-label="Increment value"
            >
              <PlusIcon />
            </NumberField.Increment>
          </NumberField.Group>
        </NumberField.Root>
      </div>
    </div>
  );
};

export default NumberInput;
