import React from 'react';

import Header from './Header';
import Placeholder from './Placeholder';
import Timetable from './Timetable';
import Controls from './Controls';

import '../css/App.css';
import '../css/print.css';

import { getIcs } from './parse-ics';
import { weeks } from './weeks';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: []};
  }

  componentDidMount() {
    // const testUrl = 'https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/480344700/uazpIQY7XfuprNC8TsIhH6i5UB4NdmDJcCA2wexKHIz/timetable.ics';
    const testUrl = 'timetable.ics';
    // Get ICS data
    getIcs(testUrl).then(data => {
      // Get list of unique units
      let units = new Set();
      data.forEach(item => units.add(item.unit));
      // Store in state and make units an array
      this.setState({data: data, units: [...units]})
    });
    // Get weeks and store in State
    const weekOutput = weeks('2018-03-05', '2018-06-08', '2018-04-02');
    this.setState({
      weekMap: weekOutput.weekMap,
      weekCount: weekOutput.weekCount
    });
  }

  render() {
    return (
      <div className="App">
        <Controls />
        <div className="paper">
          <Header />
          {(this.state.data.length > 0) ?
            <Timetable
              data={this.state.data}
              units={this.state.units}
              weekMap={this.state.weekMap}
              weekCount={this.state.weekCount}
            />
            : <Placeholder />
          }
        </div>
      </div>
    );
  }
}

export default App;
