import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function SliderCom(props) {
  const { asNavFor, className, settings, children, selector } = props;

  return (
    <Slider
      asNavFor={asNavFor || false}
      ref={selector}
      className={`${className || ""}`}
      {...settings}
    >
      {children}
    </Slider>
  );
}

SliderCom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  asNavFor: PropTypes.string,
  className: PropTypes.string,
  settings: PropTypes.object,
  selector: PropTypes.object,
};
