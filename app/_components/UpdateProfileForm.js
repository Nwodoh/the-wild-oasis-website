"use client";

import Image from "next/image";
import { UpdateGuest } from "../_lib/actions";
import { useState } from "react";
import { localCountries } from "../_lib/_localCountries";
import SelectCountry from "./SelectCountry";
import SubmitBtn from "./SubmitBtn";

function UpdateProfileForm({ guest }) {
  const { fullName, email, nationality, nationalId, countryFlag } = guest;
  const countries = localCountries;
  const [flag, setFlag] = useState(countryFlag);

  return (
    <form
      action={UpdateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name=""
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <span className="relative inline-block h-4 w-7">
            {flag && (
              <Image
                src={flag}
                alt="Country flag"
                fill
                className="object-cover h-5 rounded-sm"
              />
            )}
          </span>
        </div>

        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
          countries={countries}
          flag={flag}
          setFlag={setFlag}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalId"
          defaultValue={nationalId}
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitBtn
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          mainElement="Update profile"
        />
      </div>
    </form>
  );
}

export default UpdateProfileForm;
