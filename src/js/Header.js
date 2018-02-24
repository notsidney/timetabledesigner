import React from 'react';

import Editable from './Editable';

import '../css/Header.css';

const Header = (props) => {
  return(
    <div className="Header">
      <Editable initial={`Semester ${new Date().getMonth() < 6 ? 1:2}`} />
      <Editable initial={new Date().getFullYear()} />
    </div>
  )
}

export default Header;
