import React from "react";

const Footer = () => {
    return (
        <div className="bg-dark text-light p-4 text-center">
            <h6 className="mb-0">All rights reserved &copy; {new Date().getFullYear()}</h6>
        </div>
    );
};

export default Footer;
