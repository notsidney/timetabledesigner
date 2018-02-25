import React from 'react';

import '../css/Editable.css';

const Editable = props => {
  return(
    <div
      className={'Editable ' + props.className}
      //contentEditable
    >
      {props.initial}
    </div>
  )
}

export default Editable;
