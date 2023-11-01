function selectDay() {
    const dayEl = document.querySelector("#Day");
    localStorage.setItem("selectedDay", dayEl.value)
    refresh();
}

function refresh() {
    const selectedDay = localStorage.getItem("selectedDay");
    let calendar = [];
    const calendarText = localStorage.getItem(selectedDay + ".calendar");
    if (calendarText) {
        calendar = JSON.parse(calendarText);
    }

    if (calendar.length) {
        for (const [i, row] of calendar.entries()) {
            const hourTdEl = document.createElement('td');
            const hostTdEl = document.createElement('td');
            const activitytdEL = document.createElement('td');

            const id = row.id;

            if (row.hasOwnProperty(host)) {
                hourTdEl.textContent = row.hour;
                hostTdEl.textContent = row.host;
                activitytdEL.textContent = row.activity;
            } else {
                hourTdEl.textContent = row.hour;
                hostTdEl.textContent = '';
                activitytdEL.textContent = '';
            }
            
            const rowEl = document.createElement('tr');
            rowEl.appendChild(hourTdEl);
            rowEl.appendChild(hostTdEl);
            rowEl.appendChild(activitytdEL);

            document.getElementById(id).innerHTML = rowEl.innerHTML;
        }
    }
}

function update() {
    const rowIds = ["8AM","9AM","10AM","11AM","12AM","1PM","2PM",
         "3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"]

    const selectedDay = localStorage.getItem("selectedDay");
    let calendarObj = {};
    const table = document.getElementById('calendar');

    for (const [i, id] of rowIds){
        calendarObj[id] = { hour: table.rows[i+1].cells[0].innerHTML,
                            host: table.rows[i+1].cells[1].innerHTML,
                            activity: table.rows[i+1].cells[2].innerHTML
        };
    }
    localStorage.setItem("calendar", calendarObj);
}