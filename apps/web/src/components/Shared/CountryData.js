
export const fetchCountryData = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data.map((country) => ({
    label: country.name.common,
    value:
      country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
    flag: country.flags.png,
  }));
};
