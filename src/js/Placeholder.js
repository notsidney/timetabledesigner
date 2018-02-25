import React from 'react';

import '../css/Placeholder.css';

const Placeholder = (props) => {
  return(
    <div className="Placeholder">
      {props.loading ? 'Loading timetable…' : 'Import a timetable to get started'}
    </div>
  );
}

export default Placeholder;
