function CheckBox({ children, disabled, checked, onChange, placeholder }) {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        placeholder={placeholder}
      />
      {children}
    </label>
  );
}

export default CheckBox;