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

  importWeeks() {
    // Get weeks and store in State
    const weekOutput = getSessionWeeks('2018-03-05', '2018-06-08', '2018-04-02');
    this.setState({
      weekMap: weekOutput.weekMap,
      weekCount: weekOutput.weekCount
    });
  }

  render() {
    return (
      <div className="App">
        <Controls
          importTimetable={this.importTimetable}
          units={this.state.units}
        />
        <div className="paper">
          <Header />
          {(this.state.data.length > 0 && !this.state.loading) ?
            <Timetable
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
