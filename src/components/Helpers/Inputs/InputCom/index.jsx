import React from "react";
import PropTypes from "prop-types";
import Icons from "../../Icons";

export default function InputCom({
  label,
  type,
  name,
  placeholder,
  iconName,
  inputHandler,
  value,
}) {
  return (
    <div className="input-com">
      {label && (
        <label
          className="input-label text-dark-gray dark:text-white text-xl font-bold block mb-2.5"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-light-purple dark:border-[#FFAB3329] w-full rounded-[50px] h-[58px] overflow-hidden relative ">
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className="input-field text-sm placeholder:text-sm sm:placeholder:text-base sm:text-base px-4 sm:px-6 text-dark-gray dark:text-white w-full h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-0 focus:outline-none"
          type={type}
          id={name}
        />
        {iconName && (
          <div className="absolute right-6 bottom-[19px] z-10">
            <Icons name={iconName} />
          </div>
        )}
      </div>
    </div>
  );
}

InputCom.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  iconName: PropTypes.string,
  inputHandler: PropTypes.func,
  value: PropTypes.string || PropTypes.number,
};
