import React from 'react';

const Checkbox = (props) => {
  return(
    <div>
      <input
        type="checkbox"
        id={`display-${props.for}`}
        name={`display-${props.for}`}
        checked={props.value}
        onChange={() => props.display(props.for)}
      />
      <label for={`display-${props.for}`}>
        {props.for.charAt(0).toUpperCase() + props.for.slice(1)}
      </label>
    </div>
  );
}

export default Checkbox;
