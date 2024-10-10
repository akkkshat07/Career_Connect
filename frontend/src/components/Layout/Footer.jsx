import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import "./Layout.css";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div className="footer-container">
        {/* Social Media */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a
              href="https://github.com/sharwarpatil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/sharwar-patil/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Career Connect</h3>
          <p>Your go-to platform for career growth and opportunities.</p>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@careerconnect.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ color: "white", fontSize: "medium" }}>
          Made with ❤️ by Sharwar Patil and Akshat Yadhav
        </p>
      </div>
    </footer>
  );
}

export default Footer;
