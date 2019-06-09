import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="icons">
        <a
          href="https://www.github.com/abdultolba"
          rel="noreferrer noopener"
          alt="Github"
          target="_blank"
        >
          <i className="icon ion-logo-github" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/abdulrahman-tolba"
          rel="noreferrer noopener"
          alt="LinkedIn"
          target="_blank"
        >
          <i className="icon ion-logo-linkedin" /> LinkedIn
        </a>
        <a
          href="https://www.twitter.com/abdultolba_"
          rel="noreferrer noopener"
          alt="Twitter"
          target="_blank"
        >
          <i className="icon ion-logo-twitter" /> Twitter
        </a>
        <a
          href="https://www.abdultolba.com"
          rel="noreferrer noopener"
          alt="Personal Website"
          target="_blank"
        >
          <i className="icon ion-md-globe" /> Portfolio
        </a>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()} Abdulrahman Tolba. All
        Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
