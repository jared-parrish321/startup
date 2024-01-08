const express = require('express');
const app = express();

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
apiRouter.get('/calendar/:day', (req, res) => {
  const dayOfWeek = req.params.id;
  switch (dayOfWeek.toLowerCase()) {
    case 'monday':
      res.send(monday);
      break;
    case 'tuesday':
      res.send(tuesday);
      break;
    case 'wednesday':
      res.send(wednesday);
      break;
    case 'thursday':
      res.send(thursday);
      break;
    case 'friday':
      res.send(friday);
      break;
    case 'saturday':
      res.sent(saturday);
      break;
    case 'sunday':
      res.sent(sunday);
      break;
    default:
      res.send(monday);
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

