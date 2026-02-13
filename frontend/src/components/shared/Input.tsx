import { InputElement } from "../../interfaces/inputElement";

interface InputProps {
  inputElement: InputElement;
  index?: number;
}

export default function Input({ inputElement, index }: InputProps) {
  if (inputElement.isVisible === false) return null;

  return (
    <div className="mb-3" key={index}>
      <label className="form-label">{inputElement.label}</label>

      <input
        id={inputElement.id}
        type={inputElement.type}
        disabled={inputElement.isEditable === false}
        className={`form-control ${inputElement.error ? "is-invalid" : ""}`}
        value={inputElement.value}
        onChange={(e) => inputElement.updateFunction?.(e, inputElement.id)}
      />

      {inputElement.error && (
        <div className="invalid-feedback">{inputElement.errorMessage}</div>
      )}
    </div>
  );
}
