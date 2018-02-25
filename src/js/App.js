import React from 'react';

import Header from './Header';
import Placeholder from './Placeholder';
import Timetable from './Timetable';
import Controls from './Controls';

import '../css/App.css';
import '../css/print.css';

import { getIcs } from './getIcs';
import { getSessionWeeks } from './getSessionWeeks';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: []};

    this.importTimetable = this.importTimetable.bind(this);
    this.importWeeks = this.importWeeks.bind(this);
    this.unhide = this.unhide.bind(this);
  }

  importTimetable(url) {
    // Get ICS data
    getIcs(url, this).then(data => {
      // Get list of unique units
      let units = new Set();
      data.forEach(item => units.add(item.unit));
      // Store in state and make units an array
      this.setState({data: data, units: [...units]})
    });
  }

  importWeeks(start, end, breaks) {
    // Get weeks and store in State
    const weekOutput = getSessionWeeks(start, end, breaks);
    this.setState({
      weekMap: weekOutput.weekMap,
      weekCount: weekOutput.weekCount
    });
  }

  unhide() {
    this.timetable.setState({removed: [], removedDays: [], removedHours: []});
  }

  render() {
    return (
      <div className="App">
        <Controls
          units={this.state.units}
          importTimetable={this.importTimetable}
          importWeeks={this.importWeeks}
          unhide={this.unhide}
        />
        <div className="paper">
          <Header />
          {(this.state.data.length > 0 && !this.state.loading) ?
            <Timetable
              ref={timetable => this.timetable = timetable}
              data={this.state.data}
              units={this.state.units}
              weekMap={this.state.weekMap}
              weekCount={this.state.weekCount}
            />
            : <Placeholder loading={this.state.loading} />
          }
        </div>
      </div>
    );
  }
}

export default App;
