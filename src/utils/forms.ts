import { Option } from "@/components/forms/select/controlled-select";

const convertToSelectOption = (label: string): Option => ({ label, value: label });
export const convertToSelectOptions = (labels: string[]): Option[] => labels.map(convertToSelectOption);