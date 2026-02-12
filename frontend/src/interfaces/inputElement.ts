export interface InputElement {
  label: string;
  value: string | string;
  type: string;
  id: string;
  updateFunction: () => void;
  validationFunction: () => boolean;
  isEditable: boolean;
  isVisible: boolean;
}
