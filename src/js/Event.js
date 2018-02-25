import React from 'react';

import Editable from './Editable';

import '../css/Event.css';
import '../css/button.css';

class Event extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.remove(this.props.index);
  }

  render() {
    let extraClasses = '';
    if (this.props.overlap) extraClasses += ' overlap';
    if (this.props.removed) extraClasses += ' removed';

    let extraEditables = [];
    if (this.props.exceptions.length > 0) {
      console.log(this.props.exceptions);
      extraEditables.push(
        // If first element of array is Only
        this.props.exceptions[0] === 'Only' ?
          <Editable className="event-exceptions" initial={
            'Only Wk ' + this.props.exceptions[1]
          } />
        :
        // Else, write Except
          <Editable className="event-exceptions" initial={
            'Except Wk ' + this.props.exceptions
          } />
      );
    }

    return(
      <div
        className={'Event unit-' + this.props.unitIndex + extraClasses}
        style={this.props.style}
      >
        <Editable className="event-unit" initial={this.props.unit} />
        <Editable className="event-type" initial={this.props.type} />
        {extraEditables}
        <Editable className="event-location" initial={this.props.location} />
        <button className="remove" onClick={this.handleClick}>
          &times;
        </button>
      </div>
    );
  }
}

export default Event;
