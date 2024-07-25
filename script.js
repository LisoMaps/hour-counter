// add leading 0's to single digit minute values
document.addEventListener('DOMContentLoaded', () => {
  const startMinuteInput = document.getElementById('startMinute');
  const endMinuteInput = document.getElementById('endMinute');

  function formatMinuteInput(event) {
    let value = event.target.value;
    if (value.length === 1) {
      value = '0' + value; // add leading zero if value is single digit
    }
    event.target.value = value;
  }

  // apply to both minute inputs
  startMinuteInput.addEventListener('input', formatMinuteInput);
  endMinuteInput.addEventListener('input', formatMinuteInput);
});

// on page load/refresh set start and end times to 12:00 am
document.addEventListener('DOMContentLoaded', () => {
  const startHourInput = document.getElementById('startHour');
  const startMinuteInput = document.getElementById('startMinute');
  const startPeriodInput = document.getElementById('startPeriod');
  const endHourInput = document.getElementById('endHour');
  const endMinuteInput = document.getElementById('endMinute');
  const endPeriodInput = document.getElementById('endPeriod');

  // format minutes with leading zero
  function formatMinute(value) {
    return value.toString().padStart(2, '0');
  }

  // Set default values
  startHourInput.value = 12;
  startMinuteInput.value = formatMinute(0);
  startPeriodInput.value = 'AM';

  endHourInput.value = 12;
  endMinuteInput.value = formatMinute(0);
  endPeriodInput.value = 'AM';
});

// input time values wrap around when using arrows (any value above max goes back to min value)



// main function
function calculateHours() {
  const startHour = parseInt(document.getElementById('startHour').value, 10);
  const startMinute = parseInt(document.getElementById('startMinute').value, 10);
  const startPeriod = document.getElementById('startPeriod').value;
  const endHour = parseInt(document.getElementById('endHour').value, 10);
  const endMinute = parseInt(document.getElementById('endMinute').value, 10);
  const endPeriod = document.getElementById('endPeriod').value;

  if (!isNaN(startHour) && !isNaN(startMinute) && !isNaN(endHour) && !isNaN(endMinute)) {
      let startHours = startHour % 12 + (startPeriod === 'PM' ? 12 : 0);
      let endHours = endHour % 12 + (endPeriod === 'PM' ? 12 : 0);
      
      const startTotalMinutes = startHours * 60 + startMinute;
      const endTotalMinutes = endHours * 60 + endMinute;

      let diffMinutes = endTotalMinutes - startTotalMinutes;

      if (diffMinutes < 0) {
          diffMinutes += 24 * 60; // handle case where end time is past midnight
      }

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      let result = ``;

      // result conditionals
      if (hours === 0 && minutes === 0) {
        result = 'Input times are identical!';
      } else if (hours === 0 && minutes === 1) {
        result = `${minutes} minute`;
      } else if (hours === 0 && minutes > 1) {
        result = `${minutes} minutes`;
      } else if (hours === 1 && minutes === 0) {
        result = `${hours} hour`;
      } else if (hours === 1 && minutes === 1) {
        result = `${hours} hour and ${minutes} minute`;
      } else if (hours === 1 && minutes > 1) {
        result = `${hours} hour and ${minutes} minutes`;
      } else if (hours > 1 && minutes === 0) {
        result = `${hours} hours`;
      } else if (hours > 1 && minutes === 1) {
        result = `${hours} hours and ${minutes} minute`;
      } else if (hours > 1 && minutes > 1) {
        result = `${hours} hours and ${minutes} minutes`;
      }
  
      document.getElementById('result').textContent = result;
    } else {
      document.getElementById('result').textContent = 'Please enter valid times.';
    }
}
