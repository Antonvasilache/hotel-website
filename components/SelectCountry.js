import { getCountries } from "@/helpers/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  //Using a countries API to retrieve all the countries and their respective flags, to be used in the country select below
  const countries = await getCountries();

  //Retrieving the flag for the selected country
  const flag =
    countries.data.find((country) => country.name === defaultCountry)?.flag ??
    "";

  return (
    <select
      name={name}
      id={id}
      // Encoding BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      {/* Creating the drop down list of all the available countries */}
      {/* ! Found BUG related to flag when selecting Switzerland */}
      <option value="">Select country...</option>
      {countries.data.map((country) => (
        <option key={country.name} value={`${country.name}%${country.flag}`}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
