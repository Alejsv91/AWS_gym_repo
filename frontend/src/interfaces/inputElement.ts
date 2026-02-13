export interface InputElement {
  label: string;
  value: string | number;
  type: string;
  id: string;

  updateFunction?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;

  validationFunction?: (value: string | number) => void;

  isEditable?: boolean;
  isVisible?: boolean;

  error?: boolean;
  errorMessage?: string;
}
