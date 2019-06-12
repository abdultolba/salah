import React from "react";
import Anchor from './Anchor';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="icons">
        Contact:
        <Anchor link="https://www.github.com/abdultolba" name="Github">
          <i className="icon ion-logo-github" />
        </Anchor>
        <Anchor link="https://www.linkedin.com/in/abdulrahman-tolba" name="LinkedIn">
          <i className="icon ion-logo-linkedin" />
        </Anchor>
        <Anchor link="https://www.twitter.com/abdultolba_" name="Twitter">
          <i className="icon ion-logo-twitter" />
        </Anchor>
        <Anchor link="https://www.abdultolba.com" name="Personal Website">
          <i className="icon ion-md-globe" />
        </Anchor>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()} Abdulrahman Tolba. All
        Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
