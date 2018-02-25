import React from 'react';

import '../css/Controls.css';

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timetableUrl: 'https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/480344700/uazpIQY7XfuprNC8TsIhH6i5UB4NdmDJcCA2wexKHIz/timetable.ics',
      unitColours: [
        '#ff3b30',
        '#ff9500',
        '#ffcc00',
        '#4cd964',
        '#5ac8fa',
        '#007aff',
        '#7856D6'
      ]
    }
  }

  render() {
    return(
      <div className="Controls">
        <h1>Timetable Designer</h1>

        <h2>Import timetable</h2>
        <form
          className="import-timetable"
          onSubmit={e => {
            this.props.importTimetable(this.state.timetableUrl);
            e.preventDefault();
          }}
        >
          <input
            type="text"
            defaultValue="https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/480344700/uazpIQY7XfuprNC8TsIhH6i5UB4NdmDJcCA2wexKHIz/timetable.ics"
            onChange={e => this.setState({timetableUrl: e.target.value})}
          />
          <input type="Submit" value="Import" />
        </form>

        {
          (this.props.units) ?
            <React.Fragment>
              <h2>Import weeks</h2>
              <form className="import-weeks">
                <label htmlFor="preset">Presets</label>
                <select name="preset">
                  <option value="usyd-1-2018">USYD Sem 1 2018</option>
                  <option value="usyd-2-2018">USYD Sem 2 2018</option>
                  <option value="usyd-1-2019">USYD Sem 1 2019</option>
                  <option value="usyd-2-2019">USYD Sem 2 2019</option>
                </select>
                <label htmlFor="start">Start date</label>
                <input type="text" name="start" />
                <label htmlFor="end">End date</label>
                <input type="text" name="end" />
                <label htmlFor="break">Break date</label>
                <input type="text" name="break" />
                <input type="submit" value="Import weeks" />
              </form>

              <h2>Unit colours</h2>
              <form className="unit-colours">
                {this.props.units.map((item, index) => {
                  return(
                    <React.Fragment key={item}>
                      <input
                        type="color"
                        name={'unit-' + index}
                        defaultValue={this.state.unitColours[index]}
                      />
                      <label htmlFor={'unit-' + index}>{item}</label>
                    </React.Fragment>
                  )
                })}
              </form>

              <h2>Resets</h2>
              <button>Show all removed items</button>
              <button>Remove overlaps</button>
            </React.Fragment>
          : null
        }

        </div>
    );
  }
}

export default Controls;
