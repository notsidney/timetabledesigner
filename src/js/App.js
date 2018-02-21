import React, { Component } from 'react';

import '../css/App.css';

import { getIcs } from './parse-ics';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const testUrl = 'https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/480344700/WpiIQ94FKwivKRb0T736vcxLZaikgGhbdmNBx0zflec/timetable.ics';
    getIcs(testUrl).then(data => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
