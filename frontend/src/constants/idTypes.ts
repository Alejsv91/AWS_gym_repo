export const idTypes = {
    nationalId: {
      code: 'NATIONAL_ID',
      label: 'National ID',
      regex: /^[0-9]{9,12}$/,
      warningMessage: 'National ID should be between 9 to 12 digits.',
    },
    corporateId: {
      code: 'CORPORATE_ID',
      label: 'Corporate ID',
      regex: /^[0-9]{10}$/,
      warningMessage: 'Corporate ID should be exactly 10 digits.',
    },
    DIMEX: {
      code: 'DIMEX',
      label: 'DIMEX',
      regex: /^[0-9]{12}$/,
      warningMessage: 'DIMEX should be exactly 12 digits.',
    },
  } as const;
  
  type IdTypeKey = keyof typeof idTypes; // "nationalId" | "corporateId" | "DIMEX"
  
  export function getIdTypeByLabel(label: string) {
    return Object.values(idTypes).find((type) => type.label === label);
  }