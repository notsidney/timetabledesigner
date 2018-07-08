import React from 'react';

import '../css/button.css';

class Label extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.remove(this.props.index, this.props.num);
  }

  render() {
    let classes = this.props.className;
    if (this.props.removed) classes += ' removed';

    return(
      <div
        className={classes}
        style={this.props.style}
      >
        {this.props.label}
        <button className="remove" onClick={this.handleClick}>
          &times;
        </button>
      </div>
    );
  }
}

export default Label;
