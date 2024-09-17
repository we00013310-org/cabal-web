import React from "react";
import PropTypes from "prop-types";

function DataIteration(props) {
  const { datas, startLength, endLength, children } = props;
  return (
    <>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;

DataIteration.propTypes = {
  datas: PropTypes.array,
  startLength: PropTypes.number,
  endLength: PropTypes.number,
  children: PropTypes.func,
};
