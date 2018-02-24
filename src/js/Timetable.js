import React from 'react';

import Event from './Event';
import Label from './Label';

import '../css/Timetable.css';

class Timetable extends React.PureComponent {
  constructor(props) {
    super(props);

    // Store all in State
    this.state = {
      // To store indexes of removed events
      removed: [],
      removedDays: [],
      removedHours: []
    };

    // Map of day names
    this.dayNames = new Map([
      [1, 'Mon'],
      [2, 'Tue'],
      [3, 'Wed'],
      [4, 'Thu'],
      [5, 'Fri'],
      [6, 'Sat'],
      [7, 'Sun']
    ]);

    this.createDayLabels = this.createDayLabels.bind(this);
    this.createHourLabels = this.createHourLabels.bind(this);
    this.remove = this.remove.bind(this);
    this.removeDay = this.removeDay.bind(this);
    this.removeHour = this.removeHour.bind(this);
    this.unhide = this.unhide.bind(this);
  }

  // Create day and hour labels for the first time
  componentWillMount() {
    this.createDayLabels();
    this.createHourLabels();
  }

  createDayLabels() {
    // Using data, get min/max days
    let minDay = 99;
    let maxDay = 0;

    this.props.data.forEach(item => {
      if (item.day < minDay) minDay = item.day;
      if (item.day > maxDay) maxDay = item.day;
    });

    // Stores labels
    const days = [];
    // Stores column indexes of labels
    const daysMap = new Map();
    // Current index
    let count = 2;
    // Loop through each hour between min and max inclusive
    for (let i = minDay; i <= maxDay; i++) {
      // Add day to days array
      days.push(i);
      // Push count to map
      daysMap.set(i, count);
      // Increment count
      count++;
    }

    this.setState({
      minDay: minDay, maxDay: maxDay,
      days: days, daysMap: daysMap
    });
  }

  createHourLabels() {
    // Using data, get min/max days
    let minHour = 99;
    let maxHour = 0;

    this.props.data.forEach(item => {
      if (item.start < minHour) minHour = item.start;
      if (item.end > maxHour) maxHour = item.end;
    });

    // Stores labels
    const hours = [];
    // Stores row indexes of labels
    const hoursMap = new Map();
    // Current index
    let count = 2;
    // Loop through each hour between min and max inclusive
    for (let i = minHour; i < maxHour; i++) {
      hours.push(i);
      // Push count to map
      hoursMap.set(i, count);
      // Increment count
      count++;
    }
    // Add count of last hour (won't be displayed)
    hoursMap.set(maxHour, count);

    this.setState({
      minHour: minHour, maxHour: maxHour,
      hours: hours, hoursMap: hoursMap
    });
  }

  // Remove events, days, hours
  remove(index) {
    this.setState({ removed: [...this.state.removed, index] });
  }
  removeDay(index) {
    this.setState({ removedDays: [...this.state.removedDays, index] });
  }
  removeHour(index) {
    this.setState({ removedHours: [...this.state.removedHours, index] });
  }

  // Unhide all
  unhide() {
    this.setState({ removed: [], removedDays: [], removedHours: [] })
  }

  render() {
    // Generate day labels
    const dayLabels = this.state.days.map((item, index) => {
      return(
        <Label
          key={index}
          index={index}
          className="day-label"
          style={{gridColumnStart: this.state.daysMap.get(item)}}
          label={this.dayNames.get(item)}
          removed={this.state.removedDays.indexOf(index) > -1}
          remove={this.removeDay}
        />
      );
    });
    // Generate hour labels
    const hourLabels = this.state.hours.map((item, index) => {
      let out = item < 10 ? '0' + item : item;
      return(
        <Label
          key={index}
          index={index}
          className="hour-label"
          style={{gridRowStart: this.state.hoursMap.get(item)}}
          label={out + ':00'}
          removed={this.state.removedHours.indexOf(index) > -1}
          remove={this.removeHour}
        />
      );
    });
    // Generate events
    const events = this.props.data.map((item, index) => {
      return (
        <Event
          key={index}
          index={index}
          unitIndex={this.props.units.indexOf(item.unit)}
          style={{
            gridColumnStart: this.state.daysMap.get(item.day),
            gridRowStart: this.state.hoursMap.get(item.start),
            gridRowEnd: this.state.hoursMap.get(item.end),
          }}
          overlap={item.overlap}
          removed={this.state.removed.indexOf(index) > -1}
          unit={item.unit}
          type={item.type}
          exceptions={
            // Create an array from weekMap and use Array.map() to create a
            // new array from it
            Array.from(this.props.weekMap).map(week => {
              // Only add to new array if it's not in item.weeks and not Break
              if (item.weeks.indexOf(week[0]) === -1 && week[1] !== 'Break')
                return week[1];
            })
            // Then, filter out null items
            .filter(item => item)
          }
          location={item.location}
          remove={this.remove}
        />
      );
    });
    // Render timetable
    return(
      <div className="Timetable">
        {hourLabels}
        {dayLabels}
        {events}
      </div>
    );
  }
}

export default Timetable;
