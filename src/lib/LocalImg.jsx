import PropTypes from "prop-types";
const LocalImg = ({ url, alt, className }) => {
  return (
    <img
      src={`/globalImages/${url}`}
      alt={alt || "image"}
      className={className || ""}
    />
  );
};

export default LocalImg;

LocalImg.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  alt: PropTypes.string,
};
