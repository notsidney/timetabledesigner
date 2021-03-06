import React from 'react';

import Checkbox from './Checkbox';

import '../css/Controls.css';

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timetableUrl: '',
      fonts: '',
      unitColours: [
        '#ff3b30',
        '#ff9500',
        '#4cd964',
        '#007aff',
        '#7856d6',
        '#5ac8fa',
        '#ffcc00'
      ],
      display: {
        header: true,
        unit: true,
        type: true,
        weeks: false,
        location: true,
        grid: false
      },
      disableWeeksCheckbox: true,
      style: {
        outlined: false,
        monochrome: false
      }
    }

    this.weeksPreset = this.weeksPreset.bind(this);
    this.changeColour = this.changeColour.bind(this);
    this.display = this.display.bind(this);
    this.style = this.style.bind(this);
  }

  weeksPreset(preset) {
    let startDate = null;
    let endDate = null;
    let breakDate = null;

    switch (preset) {
      case 'usyd-1-2018':
        startDate = '2018-03-05';
        endDate = '2018-06-08';
        breakDate = '2018-04-02';
        break;
      case 'usyd-2-2018':
        startDate = '2018-07-30';
        endDate = '2018-11-02';
        breakDate = '2018-09-24';
        break;
      case 'usyd-1-2019':
        startDate = '2019-02-25';
        endDate = '2019-05-31';
        breakDate = '2019-04-22';
        break;
      case 'usyd-2-2019':
        startDate = '2019-08-05';
        endDate = '2019-11-08';
        breakDate = '2019-09-30';
        break;
      default:
        startDate = null;
        endDate = null;
        breakDate = null;
    }

    if (startDate && endDate && breakDate) {
      this.setState({ startDate, endDate, breakDate });
    }
  }

  changeColour(colour, index) {
    let newColours = this.state.unitColours;
    newColours[index] = colour;
    this.setState({unitColours: [...newColours]});
  }

  display(what) {
    const display = {...this.state.display};
    display[what] = !display[what];
    this.setState({ display: display });
  }

  style(what) {
    const style = {...this.state.style};
    style[what] = !style[what];
    this.setState({ style: style });
  }

  render() {
    // Update custom colours
    document.getElementById('custom-css').innerHTML =
      `
      :root { ${
      this.state.unitColours.reduce((accumulator, currentVal, currentIndex) => 
        accumulator += '--unit-' + currentIndex + ': ' + currentVal + '; '
      , '')
      } }
      .paper { font-family: ${this.state.fonts} }
      .Header { display: ${this.state.display.header ? 'flex' : 'none'} }
      .event-unit { display: ${this.state.display.unit ? 'block' : 'none'} }
      .event-type { display: ${this.state.display.type ? 'block' : 'none'} }
      .event-exceptions { display: ${this.state.display.weeks ? 'block' : 'none'} }
      .event-location { display: ${this.state.display.location ? 'block' : 'none'} }
      .hour-label::before { display: ${this.state.display.grid ? 'block' : 'none'} }
      `
    ;
    const bodyClasses = [];
    if (this.state.style.outlined) bodyClasses.push('style-outlined');
    if (this.state.style.monochrome) bodyClasses.push('style-monochrome');
    document.body.classList = bodyClasses.join(' ');

    return(
      <div className="Controls">
        <h1>Timetable Designer</h1>
        by&nbsp;
        <a
          href="https://github.com/notseenee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sidney&nbsp;Alcantara
        </a>&nbsp;|&nbsp;
        <a
          href="https://github.com/notseenee/timetabledesigner/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source&nbsp;code
        </a>

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
            value={this.state.timetableUrl}
            onChange={e => this.setState({timetableUrl: e.target.value})}
          />
          <input type="Submit" value="Import" />
        </form>

        <h2>Custom Fonts</h2>
        <form
          className="custom-fonts"
          onSubmit={e => {
            this.setState({ fonts: e.target.elements.fonts.value });
            e.preventDefault();
          }}
        >
          <input type="text" name="fonts" />
          <input type="Submit" value="Import" />
        </form>

        {
          (this.props.units) ?
            <React.Fragment>
              <h2>Import weeks</h2>
              <form
                className="import-weeks"
                onSubmit={e => {
                  this.props.importWeeks(
                    this.state.startDate,
                    this.state.endDate,
                    this.state.breakDate.indexOf(',') > -1 ?
                      this.state.breakDate.split(',')
                    : this.state.breakDate
                  );
                  this.setState({
                    display: { ...this.state.display, weeks: true },
                    disableWeeksCheckbox: false
                  });
                  e.preventDefault();
                }}
              >
                <label htmlFor="preset">Presets</label>
                <select name="preset"
                  onChange={e => this.weeksPreset(e.target.value)}
                  defaultValue="blank"
                >
                  <option disabled value="blank">Choose preset</option>
                  <option value="usyd-1-2018">USYD Sem 1 2018</option>
                  <option value="usyd-2-2018">USYD Sem 2 2018</option>
                  <option value="usyd-1-2019">USYD Sem 1 2019</option>
                  <option value="usyd-2-2019">USYD Sem 2 2019</option>
                </select>
                <label htmlFor="start">Start date</label>
                <input type="text" name="start"
                  value={this.state.startDate}
                  onChange={e => {this.setState({startDate: e.target.value})}}
                />
                <label htmlFor="end">End date</label>
                <input type="text" name="end"
                  value={this.state.endDate}
                  onChange={e => {this.setState({endDate: e.target.value})}}
                />
                <label htmlFor="break">Break date</label>
                <input type="text" name="break"
                  value={this.state.breakDate}
                  onChange={e => {this.setState({breakDate: e.target.value})}}
                />
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
                        onChange={e => {
                          this.changeColour(e.target.value, index)
                        }}
                      />
                      <label htmlFor={'unit-' + index}>{item}</label>
                    </React.Fragment>
                  )
                })}
              </form>

              <h2>Display</h2>
              <div className="checkboxes-3col">
                <Checkbox for="header" value={this.state.display.header} callback={this.display} />
                <Checkbox for="unit" value={this.state.display.unit} callback={this.display} />
                <Checkbox for="type" value={this.state.display.type} callback={this.display} />
                <Checkbox for="weeks" value={this.state.display.weeks} callback={this.display} disabled={this.state.disableWeeksCheckbox} />
                <Checkbox for="location" value={this.state.display.location} callback={this.display} />
                <Checkbox for="grid" value={this.state.display.grid} callback={this.display} />
              </div>

              <h2>Style</h2>
              <div className="checkboxes-2col">
                <Checkbox for="outlined" value={this.state.style.outlined} callback={this.style} />
                <Checkbox for="monochrome" value={this.state.style.monochrome} callback={this.style} />
              </div>

              <h2>Resets</h2>
              <button onClick={this.props.unhide}>Unhide all</button>
              <button onClick={e => {
                Array.prototype.forEach.call(
                  document.getElementById('Timetable')
                    .getElementsByClassName('overlap'),
                  elem => elem.classList.replace('overlap', 'overlap-removed')
                );
              }
              }>Remove overlaps</button>
            </React.Fragment>
          : null
        }

        </div>
    );
  }
}

export default Controls;
