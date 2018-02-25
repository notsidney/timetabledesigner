import axios from 'axios';
import moment from 'moment';

function getIcs(url, component) {
  // Route through CORS proxy
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';

  return new Promise((resolve, reject) => {
    axios.get(corsProxy + url, {
        // Send loading to App state
        onDownloadProgress: progressEvent => {
          component.setState({loading: true});
        }
      })
      .then(response => {
        // Find first and last events
        let start = response.data.indexOf('BEGIN:VEVENT');
        let end = response.data.lastIndexOf('END:VEVENT');
        // Trim string to include only events, remove END tags
        let trimmed = response.data.slice(start, end).replace('END:VEVENT', '');
        // Split each event into separate array items & make sure no empty strings
        let eventArray = trimmed.split('BEGIN:VEVENT').filter(item => item);
        // Remove loading
        component.setState({loading: false});
        // Parse string
        resolve(parseEvents(eventArray));
      })
      .catch(error => alert(`Error loading timetable:\n${error}`));
  });
}

function parseEvents(eventArray) {
  let output = [];
  let check = new Map();
  // Loop through each item
  eventArray.forEach(event => {
    // Check if not blank
    if (event) {
      let outItem = {
        'unit': '',
        'type': '',
        'day': -1,
        'start': -1,
        'end': -1,
        'location': ''
      };
      let dtStart;
      let dtEnd;
      // Split on line break
      event.split('\n').forEach(item => {
        // Summary line
        if (item.indexOf('SUMMARY') > -1) {
          outItem.unit = item.slice(item.indexOf(':') + 1, item.indexOf(' '));
          outItem.type = item.slice(item.indexOf(' ') + 1);
        }
        // Start time line
        else if (item.indexOf('DTSTART') > -1) {
          dtStart = moment(item.substr(-16), 'YYYYMMDD-HHmmss');
          outItem.day = dtStart.isoWeekday();
          outItem.start = dtStart.hour();
        }
        // End time line
        else if (item.indexOf('DTEND') > -1) {
          dtEnd = moment(item.substr(-16), 'YYYYMMDD-HHmmss');
          outItem.end = dtEnd.hour();
        }
        // Location line
        else if (item.indexOf('LOCATION') > -1) {
          outItem.location = item.slice(item.indexOf(':') + 1);
        }
      });
      // Get week
      let weekNum = dtStart.isoWeek();
      // Make a unique key
      let key = JSON.stringify(outItem);
      // Check for duplicates - check if index of event is stored
      if (check.has(key)) {
        // Using index, add current week to event in output
        output[check.get(key)].weeks.push(weekNum);
      }
      else {
        // Add index of event
        check.set(key, check.size);
        // Add current week to outItem
        outItem.weeks = [weekNum];
        // Add event to output
        output.push(outItem);
      }
    }
  });
  // Check for overlaps
  let startTimes = new Set();
  // Use set to check for duplicates
  output.forEach(item => {
    for (let i = 0; i < item.end - item.start; i++) {
      let startTime = `${item.day} ${item.start + i}`;
      if (startTimes.has(startTime)) {
        item.overlap = true;
      }
      else {
        startTimes.add(startTime);
      }
    }
  });
  return output;
}

export { getIcs };
