import React from "react";
import "./Header.css";
import avatar02 from "../image/avatar02.png";

const Header = ({black}) => {
  return (
    <header className={black ? 'black' : ' '}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          {/* <img 
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="Usuário"
          /> */}
          <img 
          src={avatar02}
          alt="Usuário"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
