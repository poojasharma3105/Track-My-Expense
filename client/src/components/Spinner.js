import React from "react";

const Spinner = () => {
  return (
    <div className="position-fixed top-0 start-50 translate-middle-x w-100 text-center mt-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
