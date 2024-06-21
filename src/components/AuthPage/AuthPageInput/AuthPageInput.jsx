/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";
import * as s from "./style";

function AuthPageInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  ref,
  message,
  disabled,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div css={s.inputBox}>
      <div css={s.inputContainer}>
        <label
          css={s.label(isFocused || inputValue)}
          htmlFor={name}
        >
          {placeholder}
        </label>
        <input
          css={s.input}
          id={name}
          type={type}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          ref={ref}
          disabled={disabled}
        />
      </div>
      <div css={s.message}>
        {!!message && (
          <div css={s.inputIcon(message.type)}>
            {message.type === "error" ? <MdErrorOutline /> : <MdCheckCircleOutline />}
          </div>
        )}
        {!!message && <div css={s.inputMessage(message.type)}>{message.text}</div>}
      </div>
    </div>
  );
}

export default AuthPageInput;
