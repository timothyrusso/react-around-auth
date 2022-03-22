import React from "react";

function Footer() {

  const date = new Date()
  let year = date.getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">© {year} Timothy Russo - Around The U.S.</p>
    </footer>
  )
}

export default Footer;
