import moment from 'moment';

function getSessionWeeks(startDay, endDay, breakDays) {
  // Get ISO week numbers
  const startWeek = moment(startDay).isoWeek();
  const endWeek = moment(endDay).isoWeek();

  // Get mid-session break
  const breakWeeks = breakDays ?
    // Check if array or string
    breakDays.isArray ?
      breakDays.map(item => moment(item).isoWeek())
    :
      [moment(breakDays).isoWeek()]
  : // Return null if no breakDays were passed
    null
  ;

  // Store week map
  const weekMap = new Map();
  let count = 0;

  for (let i = startWeek; i <= endWeek; i++) {
    if (breakWeeks.indexOf(i) > -1) {
      // If in breakWeeks array, set to break
      weekMap.set(i, 'Break');
    }
    else {
      // Increment count
      count++;
      // Else, give week number
      weekMap.set(i, count);
    }
  }

  return {weekMap: weekMap, weekCount: count};
}

export { getSessionWeeks };
