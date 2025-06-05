import React, { useState } from 'react';

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo"><a href="#">Sony</a></div>
        <ul>
          <li className="hideOnMobile"><a href="#">Home</a></li>
          <li className="hideOnMobile"><a href="#">About</a></li>
          <li className="hideOnMobile"><a href="#">Contact</a></li>
          <li className="menu-button" onClick={toggleSidebar}>
            <a href="#">☰</a>
          </li>
        </ul>
      </div>

      {showSidebar && (
        <ul className="sidebar">
          <li onClick={toggleSidebar}><a href="#">{showSidebar ? '✖' : '☰'}</a></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
