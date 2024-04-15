import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="termsandcond">
        <a
          href="https://workgapsolution.com/termsandconditions"
          target="_blank"
          className="footer-link"
        >
          Terms and Conditions
        </a>
        |
        <a
          href="https://workgapsolution.com/accessibility"
          target="_blank"
          className="footer-link"
        >
          Accessibility
        </a>
        |
        <a
          href="https://workgapsolution.com/privacy"
          target="_blank"
          className="footer-link"
        >
          Privacy Policy
        </a>
      </div>
      <div>
        <h4>
          © {new Date().getFullYear()} Work Gap Solution, SmartMomGig.com, &
          The Smart Gig Series Intellectual Property. All rights reserved
        </h4>
      </div>
    </div>
  );
};

export default Footer;
