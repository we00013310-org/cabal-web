import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function ModalCom({ action, children, situation }) {
  useEffect(() => {
    if (situation) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "unset";
    };
  });

  return (
    <div className="modal-com">
      <div
        onClick={action}
        className="fixed top-0 left-0 w-full lg:h-[100vh] h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm z-50"
      />
      <div
        style={{ maxHeight: "calc(100vh - 50px)" }}
        className="animate-fade children-element overflow-y-auto overflow-x-hidden fixed lg:h-100vh h-full z-[99999999999999] lg:w-[580px] sm:w-[450px] w-full"
      >
        {children && children}
      </div>
    </div>
  );
}

ModalCom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  action: PropTypes.func,
  situation: PropTypes.bool,
};
