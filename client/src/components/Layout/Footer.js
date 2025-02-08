import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <h6 className="mb-0">All rights reserved &copy; {new Date().getFullYear()}</h6>
      </div>
    </footer>
  );
};

export default Footer;