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