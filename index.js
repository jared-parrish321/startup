const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetCalendar
apiRouter.get('/calendar/:day', async (req, res) => {
  var dayOfWeek = req.params.day;
  dayOfWeek = dayOfWeek.toString().toLowerCase();
  const calendar = await DB.getDay(dayOfWeek);
  res.send(calendar);
});

apiRouter.post('/update/:day', async (req, _res) => {
  var dayOfWeek = req.params.day;
  dayOfWeek = dayOfWeek.toLowerCase();
  const calendar = req.body;
  await DB.updateDay(dayOfWeek, calendar);
  switch (dayOfWeek) {
    case 'monday':
      monday = calendar;
      break;
    case 'tuesday':
      tuesday = calendar;
      break;
    case 'wednesday':
      wednesday = calendar;
      break;
    case 'thursday':
      thursday = calendar;
      break;
    case 'friday':
      friday = calendar;
      break;
    case 'saturday':
      saturday = calendar;
      break;
    case 'sunday':
      sunday = calendar;
      break;
    default:
      monday = calendar;
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let monday = []
let tuesday = []
let wednesday = []
let thursday = []
let friday = []
let saturday = []
let sunday = []