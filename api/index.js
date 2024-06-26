const DomParser = require('dom-parser'),
  parser = new DomParser(),
  rp = require('request-promise'),
  fs = require('fs'),
  express = require('express'),
  cors = require('cors'),
  cache = require('memory-cache'),
  bodyParser = require('body-parser'),
  nodeMailer = require('nodemailer'),
  dotenv = require('dotenv');

dotenv.config();

const online = true;

const app = express();

const port = process.env.PORT || 5001;

var mockedTimes = [
  '10:00',
  '10:20',
  '10:40',
  '11:00',
  '11:20',
  '11:40',
  '12:00',
  '12:20',
  '12:40',
  '13:00',
  '13:20',
  '13:40',
  '14:00',
  '14:20',
  '14:40',
  '15:00',
  '15:20',
  '15:40',
  '16:00',
  '16:20',
  '16:40',
  '17:00',
  '17:20',
  '17:40',
  '18:00',
  '18:20',
  '18:40',
  '19:00',
  '19:20',
  '19:40',
  '20:00',
  '20:20',
  '20:40',
  '21:00',
  '21:20',
  '21:40',
  '22:00',
  '22:20',
  '22:40',
  '23:00',
  '23:20',
  '23:40',
  '00:00',
  '00:20',
  '00:40',
];

var todo;
var dom = null;
function buildAndResponse(html, req, res) {
  if (!dom) dom = parser.parseFromString(html);

  todo = [
    {
      id: 0,
      displayName: 'Parque de Mayo',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 1,
      displayName: 'Plaza Rivadavia',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 2,
      displayName: 'Hospital Penna',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 3,
      displayName: 'Villa Arias',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 4,
      displayName: 'Terminal Punta Alta',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 5,
      displayName: 'Limbo',
      way: false,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 4,
      displayName: 'Terminal Punta Alta',
      way: true,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 3,
      displayName: 'Villa Arias',
      way: true,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 2,
      displayName: 'Hospital Penna',
      way: true,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 1,
      displayName: 'Plaza Rivadavia',
      way: true,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
    {
      id: 0,
      displayName: 'Parque de Mayo',
      way: true,
      summerTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      winterTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
      normalTime: {
        weekDay: mockedTimes,
        saturday: mockedTimes,
        hollidaysSunday: mockedTimes,
      },
    },
  ];

  // tableParser(dom, 'tabla ver', 0);
  // tableParser(dom, 'tabla ver', 1);
  // tableParser(dom, 'tabla ver', 2);
  // tableParser(dom, 'tabla inv', 0);
  // tableParser(dom, 'tabla inv', 1);
  // tableParser(dom, 'tabla inv', 2);
  // tableParser(dom, 'tabla rda', 0);
  // tableParser(dom, 'tabla rda', 1);
  // tableParser(dom, 'tabla rda', 2);

  const { timeId, way, seasson, dayOfWeek } = req.params;
  //find the selected time into todo object by id and way, the pair which
  //identify a unique object in the array
  const time = todo.find(
    (time) => time.id.toString() === timeId && time.way.toString() === way
  );
  //sorting the result from less to more
  const result = time[seasson][dayOfWeek]
    .filter((hour) => hour.length > 2)
    .sort();

  if (result.length) {
    res.send({ timetables: result });
  } else {
    res.json({ error: 'No hay horarios para mostrar.' });
  }
}

function setData(req, res) {
  if (online) {
    rp.get({
      uri: 'http://www.elvillarino.com.ar/#horarios',
    })
      .then((html) => {
        buildAndResponse(html, req, res);
      })
      .catch((err) => console.log(err));
  } else {
    fs.readFile('villarino.html', 'utf8', function (err, html) {
      if (!err) {
        buildAndResponse(html, req, res);
      }
    });
  }
}

// function tableParser(dom, className, dayOfWeek) {
//   //select if it's summer, winnter hollidays or rest of the year (normalTime)
//   var table = dom.getElementsByClassName(className)[dayOfWeek].innerHTML;
//   //parse the raw HTML to get a dom representation of it
//   var domTable = parser.parseFromString(table);
//   //select only the rows of the specific table
//   var rows = domTable.getElementsByTagName('tr');

//   //convert from the number of type of day to name property to access to the
//   //object that contains all the data
//   let objNameDay;
//   switch (dayOfWeek) {
//     case 0:
//       objNameDay = 'weekDay';
//       break;
//     case 1:
//       objNameDay = 'saturday';
//       break;
//     case 2:
//       objNameDay = 'hollidaysSunday';
//       break;
//     default:
//       break;
//   }

//   //transform the seasson of the year from the class name used in the HTML
//   //to name property used in the "todo" object
//   let seasson;
//   switch (className) {
//     case 'tabla ver':
//       seasson = 'summerTime';
//       break;
//     case 'tabla inv':
//       seasson = 'winterTime';
//       break;
//     case 'tabla rda':
//       seasson = 'normalTime';
//       break;
//     default:
//       break;
//   }

//   //iteration over all rows getting the different values of each column to save it
//   //in todo object which represent the whole HTML parsed.
//   rows.forEach((row, f) => {
//     let iCol = 0;
//     if (f > 0) {
//       row.getElementsByTagName('td').forEach((hour, c) => {
//         if (c <= 10 && iCol <= 10) {
//           if (
//             seasson === 'normalTime' &&
//             iCol === 5 &&
//             objNameDay !== 'saturday' &&
//             objNameDay !== 'hollidaysSunday'
//           ) {
//             iCol++;
//           }
//           todo[iCol][seasson][objNameDay].push(hour.textContent);
//           iCol++;
//         }
//       });
//     }
//   });
// }

// configure cache middleware
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
};

function fetchHolidays(res) {
  fs.readFile('feriados.json', 'utf8', function (err, data) {
    if (!err) {
      const dataJSON = JSON.parse(data);
      res.send(dataJSON);
    }
  });
  // if (online) {
  //   rp.get({
  //     uri: 'http://nolaborables.com.ar/api/v2/feriados/2024',
  //   })
  //     .then((data) => {
  //       res.send(JSON.parse(data));
  //     })
  //     .catch((err) => console.log('EROOR: ', err));
  // } else {
  //   fs.readFile('feriados.json', 'utf8', function (err, data) {
  //     if (!err) {
  //       const dataJSON = JSON.parse(data);
  //       res.send(dataJSON);
  //     }
  //   });
  // }
}

function sendQuestion(req, res) {
  const { user, message } = req.body;
  const { email, displayName } = user;

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: 'nanodesign21@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  let mailOptions = {
    // should be replaced with real recipient's account
    to: 'nanodesign21@gmail.com',
    subject: `Consulta ${displayName}`,
    html: `
      <h3>Consulta: </h3>
      <p>${message}</p>
      <h3>Datos: </h3>
      <p>Nombre: ${displayName}</p>
      <p>Email: ${email}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ status: 'error' });
      return console.log(error);
    }
    res.send({ status: 'ok' });
  });
}

// ROUTES & MIDDLEWARES

app.use(cors());

app.get('/api/holidays', (req, res) => {
  fetchHolidays(res);
});

app.get(
  '/api/timetables/:timeId/:way/:seasson/:dayOfWeek',
  cacheMiddleware(), //7 * 24 * 3600000
  (req, res) => setData(req, res)
);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/send-mail/', (req, res) => {
  sendQuestion(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
