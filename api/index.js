var DomParser = require("dom-parser");
var parser = new DomParser();
const rp = require("request-promise");
const express = require("express");
const cors = require("cors");
const cache = require("memory-cache");

const app = express();

const port = process.env.PORT || 5000;
function setData(req, res) {
  rp.get({
    uri: "http://www.elvillarino.com.ar/#horarios"
  })
    .then(html => {
      var dom = parser.parseFromString(html);
      var todo = [
        {
          id: 0,
          displayName: "Parque de Mayo",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 1,
          displayName: "Plaza Rivadavia",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 2,
          displayName: "Hospital Penna",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 3,
          displayName: "Villa Arias",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 4,
          displayName: "Terminal Punta Alta",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 5,
          displayName: "Limbo",
          way: false,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 4,
          displayName: "Terminal Punta Alta",
          way: true,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 3,
          displayName: "Villa Arias",
          way: true,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 2,
          displayName: "Hospital Penna",
          way: true,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 1,
          displayName: "Plaza Rivadavia",
          way: true,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        },
        {
          id: 0,
          displayName: "Parque de Mayo",
          way: true,
          summerTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          winterTime: { weekDay: [], saturday: [], hollidaysSunday: [] },
          normalTime: { weekDay: [], saturday: [], hollidaysSunday: [] }
        }
      ];
      tableParser(dom, "tabla ver", todo, 0);
      tableParser(dom, "tabla ver", todo, 1);
      tableParser(dom, "tabla ver", todo, 2);
      tableParser(dom, "tabla inv", todo, 0);
      tableParser(dom, "tabla inv", todo, 1);
      tableParser(dom, "tabla inv", todo, 2);
      tableParser(dom, "tabla rda", todo, 0);
      tableParser(dom, "tabla rda", todo, 1);
      tableParser(dom, "tabla rda", todo, 2);

      const { timeId, way, seasson, dayOfWeek } = req.params;
      const time = todo.find(
        time => time.id.toString() === timeId && time.way.toString() === way
      );
      const result = time[seasson][dayOfWeek].sort();

      if (result.length) {
        res.send({ timetables: result });
      } else {
        res.status(400).json({ error: "No hay horarios para mostrar." });
      }
    })
    .catch(err => console.log(err));
}

function tableParser(dom, className, todo, dayOfWeek) {
  var table = dom.getElementsByClassName(className)[dayOfWeek].innerHTML;
  var domTable = parser.parseFromString(table);
  var rows = domTable.getElementsByTagName("tr");

  let objNameDay;
  switch (dayOfWeek) {
    case 0:
      objNameDay = "weekDay";
      break;
    case 1:
      objNameDay = "saturday";
      break;
    case 2:
      objNameDay = "hollidaysSunday";
      break;
    default:
      break;
  }

  let seasson;
  switch (className) {
    case "tabla ver":
      seasson = "summerTime";
      break;
    case "tabla inv":
      seasson = "winterTime";
      break;
    case "tabla rda":
      seasson = "normalTime";
      break;
    default:
      break;
  }

  rows.forEach((column, f) => {
    let iCol = 0;
    if (f > 0) {
      column.getElementsByTagName("td").forEach((hour, c) => {
        if (c <= 10 && iCol <= 10) {
          if (seasson === "normalTime" && iCol === 5) {
            iCol++;
          }
          todo[iCol][seasson][objNameDay].push(hour.textContent);
          iCol++;
        }
      });
    }
  });
}

// configure cache middleware
let memCache = new cache.Cache();
let cacheMiddleware = duration => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.use(cors());

app.get(
  "/api/timetables/:timeId/:way/:seasson/:dayOfWeek",
  cacheMiddleware(600000),
  (req, res) => {
    setData(req, res);
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));
