function selectDay() {
    const dayEl = document.querySelector("#selectedDay");
    localStorage.setItem("selectedDay", dayEl.value);
}

function refresh() {
    selectDay();
    const selectedDay = localStorage.getItem("selectedDay");
    let calendar = [];
    const calendarText = localStorage.getItem("Thursday.calendar");
    if (calendarText) {
        calendar = JSON.parse(calendarText);
    }


    if (Object.keys(calendar).length !== 0 ) {
        for (const [id, row] of Object.entries(calendar)) {
            if (id === "head"){
                continue;
            }
            const hourTdEl = document.createElement('td');
            const hostTdEl = document.createElement('td');
            hostTdEl.setAttribute("contenteditable", "true");
            const activitytdEL = document.createElement('td', {is: contenteditable='true'});
            activitytdEL.setAttribute("contenteditable", "true");

            hourTdEl.textContent = row.hour;
            hostTdEl.textContent = row.host;
            activitytdEL.textContent = row.activity;
            
            const rowEl = document.createElement('tr');
            rowEl.appendChild(hourTdEl);
            rowEl.appendChild(hostTdEl);
            rowEl.appendChild(activitytdEL);

            document.getElementById(id).replaceWith(rowEl);
        }
    }
}

function update() {
    selectDay();
    const rowIds = ["head","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];

    const selectedDay = localStorage.getItem("selectedDay");
    let calendarObj = {};
    calendarObj.head = {hour:"Time", host:"Host", activity: "activity"};
    const table = document.getElementById('calendar');

    for (i in rowIds){
        if (table.rows[i].cells.length === 1){
                calendarObj[rowIds[i]] = { hour: table.rows[i].cells[0].innerHTML };
        } else{
            if (table.rows[i].cells.length === 2){
                calendarObj[rowIds[i]] = { hour: table.rows[i].cells[0].innerHTML, 
                                activity: table.rows[i].cells[2].innerHTML };
            } else {
                calendarObj[rowIds[i]] = { hour: table.rows[i].cells[0].innerHTML, 
                                    host: table.rows[i].cells[1].innerHTML,
                                activity: table.rows[i].cells[2].innerHTML };
            }
        }
    }
    localStorage.setItem(selectedDay + ".calendar", JSON.stringify(calendarObj));
}