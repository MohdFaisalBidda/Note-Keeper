import React from "react";

function Header({label,symbol}) {
  return (
    <header>
      <h1>NoteKeeper <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </span></h1>
    </header>
  );
}

export default Header;
