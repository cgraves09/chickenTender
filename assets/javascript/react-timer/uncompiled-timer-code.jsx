// this file is being included for comment purposes
// it is the react code before being minified+exported from development environment
// this file is not in a usable state for regular html/javascript

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

function Timer(props) {
  const timeSpentMS = props.timeSpent
  // parse timeSpent into human-readable format
  var seconds = Math.floor((timeSpentMS / 1000) % 60);
  var minutes = Math.floor((timeSpentMS / 1000) / 60);
  // determine "helpful" message based on time spent
  var helpLink = null; // React requirement: anything rendered must be a string, a React node, or null
  if (minutes > 2) {
    // <>...</> is a "Fragment", equivalent to <React.Fragment>...</React.Fragment>, necessary because React doesn't like assigning/returning more than a single "node"
    helpLink = <>That took way to long! It might be time to think about <a target="_blank" href="https://lmgtfy.com/?q=online+dating">seeing other people.</a></>
  } else if (minutes > 1) {
    helpLink = <>You guys took a while to decide. Maybe you should <a target="_blank" href="https://lmgtfy.com/?q=relationship+counseling">talk some things over.</a></>
  } else {
    helpLink = <>That was fast! You should take your relationship to the <a target="_blank" href="https://lmgtfy.com/?q=getting+marriage+license">next level!</a></>
  }

  // display formatted time spent with message
  return (
    <div className="card">
      <div className="card-header">
        Timer
      </div>
      <div className="timer-time-spent">
        You spent {minutes} minutes and {seconds} seconds deciding where to eat.
      </div>
      <div className="timer-link-message">
        {helpLink}
      </div>
    </div>
  )
}

window.renderReact = function (timeSpent) {
  ReactDOM.render(
    <React.StrictMode>
      <Timer timeSpent={timeSpent} />
    </React.StrictMode>,
    document.getElementById('timer')
  );
}
serviceWorker.unregister(); // leftover code from using Create-React-App, do not touch
