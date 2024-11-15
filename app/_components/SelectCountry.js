"use client";

import { useEffect, useState } from "react";

// Let's imagine your colleague already built this component 😃

function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
  countries,
  flag,
  setFlag,
}) {
  const [country, setCountry] = useState(defaultCountry);

  return (
    <>
      <select
        name={name}
        id={id}
        // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
        value={`${country}%${flag}`}
        className={className}
        onChange={(e) => {
          const [newCountry, newFlag] = e.target.value.split("%");
          setCountry(newCountry);
          setFlag(newFlag);
        }}
      >
        <option value="">Select country...</option>
        {countries.map((c) => (
          <option key={c.name} value={`${c.name}%${c.flag}`}>
            {c.name}
          </option>
        ))}
      </select>
      {country}
    </>
  );
}

export default SelectCountry;
