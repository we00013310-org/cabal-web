import React from "react";
import PropTypes from "prop-types";
import Icons from "./Icons";

export default function SearchCom({ className, inputClasses, onChange }) {
  return (
    <div
      className={`w-full pl-2 py-2 flex rounded-full overflow-hidden dark:bg-white bg-dark-white   ${
        className || ""
      }`}
    >
      <div className="w-6 h-full flex justify-center items-center mr-2.5 dark:text-dark-gray text-light-gray">
        <Icons name="deep-search" />
      </div>
      <div className="flex-1 h-full">
        <input
          className={`w-full h-full focus:outline-0 focus:ring-0 bg-transparent text-light-gray dark:text-dark-gray ${
            inputClasses || ""
          }`}
          type="text"
          placeholder="Search all Cabals"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

SearchCom.propTypes = {
  className: PropTypes.string,
  inputClasses: PropTypes.string,
};
