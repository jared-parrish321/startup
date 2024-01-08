function selectDay() {
    const dayEl = document.querySelector("#selectedDay");
    localStorage.setItem("selectedDay", dayEl.value);
}

async function refresh() {
    resetTable();
    selectDay();
    const selectedDay = localStorage.getItem("selectedDay");
    let calendar = [];
    try {
        const response = await fetch(`/api/calendar/${selectedDay}`)
        const calendarText = await response.json();
        calendar = JSON.parse(calendarText);
        localStorage.setItem(selectedDay, calendarText)
    } catch {
        const calendarText = localStorage.getItem(selectedDay);
        if (calendarText) {
            calendar = JSON.parse(calendarText);
        }
    }

    if (Object.keys(calendar).length !== 0 ) {
        for (const [id, row] of Object.entries(calendar)) {
            if (id === "head"){
                continue;
            }
            const existingElement = document.getElementById(id);
            if (existingElement) {
                const hourTdEl = document.createElement('td');
                const hostTdEl = document.createElement('td');
                hostTdEl.setAttribute("contenteditable", true);
                const activitytdEL = document.createElement('td');
                activitytdEL.setAttribute("contenteditable", true);

                hourTdEl.textContent = row.hour;
                hostTdEl.textContent = row.host;
                activitytdEL.textContent = row.activity;

                const rowEl = document.createElement('tr');
                rowEl.appendChild(hourTdEl);
                rowEl.appendChild(hostTdEl);
                rowEl.appendChild(activitytdEL);

                existingElement.replaceWith(rowEl);
            }
        }
    }
}

async function update() {
    selectDay();
    const rowIds = ["head","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];

    const selectedDay = localStorage.getItem('selectedDay');
    let calendarObj = {};
    calendarObj.head = {hour:"Time", host:"Host", activity: "Activity"};
    const table = document.getElementById('calendar');

    for (const i in rowIds){
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

    try {
        await fetch(`/api/calendar/${selectedDay}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(calendarObj),

        })
    } finally {
        localStorage.setItem(selectedDay, JSON.stringify(calendarObj));
    }
}

function resetTable() {
    const table = document.getElementById('calendar');
  
    // Iterate through each row starting from the second row
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
  
      // Iterate through each cell in the row starting from the second cell
      for (let j = 1; j < row.cells.length; j++) {
        row.cells[j].textContent = '';
      }
    }
}
function setName() {
    const existingElement = document.querySelector(".player-name");
    existingElement.textContent = localStorage.getItem("userName");
}

resetTable();
setName();
