function selectDay() {
    let chosenDay = document.querySelector('#selectedDay');
    let selectedDay = chosenDay.value;
    localStorage.setItem("selectedDay", selectedDay);
    return selectedDay;
}

async function refresh() {
    let selectedDay = selectDay();
    var calendar = {};

    try {
        const response = await fetch(`/api/calendar/${selectedDay}`);
        calendar = await response.json();
        if (calendar){
            localStorage.setItem(selectedDay, JSON.stringify(calendar));
        }
    } catch {
        const calendarText = localStorage.getItem(selectedDay);
        if (calendarText) {
            calendar = await JSON.parse(calendarText);
        }
    }
    
    if (Object.keys(calendar).length !== 0 ) {
        for (const [id, row] of Object.entries(calendar)) {
            if (id === "head"){
                continue;
            }
            let existingElement = document.getElementById(id);
            if (existingElement) {
                existingElement.cells[0].textContent = row.hour;
                existingElement.cells[1].textContent = row.host;
                existingElement.cells[2].textContent = row.activity;
            }
        }
    }
}

async function update() {
    selectDay();
    let selectedDay = localStorage.getItem("selectedDay");
    const rowIds = ["head", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

    let calendarObj = {};
    const table = document.getElementById('calendar');

    for (const i in rowIds) {
        const row = table.rows[i];
        calendarObj[rowIds[i]] = {
            hour: row.cells[0].innerHTML, 
            host: row.cells[1].innerHTML, 
            activity: row.cells[2].innerHTML
        };
    }

    try {
        await fetch(`/api/update/${selectedDay}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(calendarObj),
        });
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
        row.cells[j].textContent = "";
      }
    }
}

function setName() {
    const existingElement = document.querySelector(".player-name");
    existingElement.textContent = localStorage.getItem("userName");
}

setName();