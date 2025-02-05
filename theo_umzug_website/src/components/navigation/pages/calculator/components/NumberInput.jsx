import * as React from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./index.module.css";
import Icon from "../../../../icon/Icon.jsx";

const NumberInput = ({ title, iconName }) => {
  const id = React.useId();
  const inputRef = React.useRef(null); // Create a ref for the input

  function showValue() {
    if (inputRef.current) {
      console.log(inputRef.current.value); // Get the input value
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.NumberInputPart}>
        <Icon
          iconName={iconName}
          alt={"icon"}
          style={{ width: "35px", height: "35px", marginLeft: "20px", marginTop: "3px" }}
        />
        <label htmlFor={id} className={styles.Label}>
          {title}
        </label>
      </div>
      <div className={styles.NumberInputPart}>
        <NumberField.Root id={id} defaultValue={0} className={styles.Field}>
          <NumberField.ScrubArea className={styles.ScrubArea}>
            <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
              <CursorGrowIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>
          <NumberField.Group className={styles.Group}>
            <NumberField.Decrement className={styles.Decrement}>
              <MinusIcon />
            </NumberField.Decrement>
            {/* Attach the ref to the input */}
            <NumberField.Input className={styles.Input} ref={inputRef} />
            {/* Correctly pass the function */}
            <NumberField.Increment className={styles.Increment} onClick={showValue}>
              <PlusIcon />
            </NumberField.Increment>
          </NumberField.Group>
        </NumberField.Root>
      </div>
    </div>
  );
};

function CursorGrowIcon(props) {
  return (
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
}

function PlusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
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
}

function MinusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
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
}

export default NumberInput;
