export interface CountryData {
  label: string;
  value: string;
  flag: string;
}

export const fetchCountryData: () => Promise<CountryData[]>;
