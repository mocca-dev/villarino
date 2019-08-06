var DomParser = require("dom-parser");
var parser = new DomParser();
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

let data;

const port = process.env.PORT || 5000;
function setData(req, res) {
  if (!data) {
    fs.readFile("villarino.html", "utf8", function(err, html) {
      if (!err) {
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

        data = todo;

        const { timeId, way, seasson, dayofweek } = req.params;

        const time = data.find(
          time => time.id.toString() === timeId && time.way.toString() === way
        );

        const result = time[seasson][dayofweek];

        res.send({ timetables: [] });
      }
    });
  } else {
    res.send({
      timetables: [
        "07:00",
        "07:25",
        "07:56",
        "08:21",
        "08:50",
        "09:15",
        "09:43",
        "10:11",
        "10:39",
        "11:07",
        "11:35",
        "12:03",
        "12:31",
        "12:59",
        "13:27",
        "13:55",
        "14:23",
        "14:51",
        "15:19",
        "15:47",
        "16:15",
        "16:41",
        "17:07",
        "17:31",
        "17:55",
        "18:19",
        "18:43",
        "19:07",
        "19:31",
        "19:55",
        "20:19",
        "20:43",
        "21:07",
        "21:31",
        "21:57",
        "22:23",
        "22:49",
        "23:16",
        "23:44",
        "",
        "00:14",
        "00:49",
        "01:20",
        "02:12",
        "03:27",
        "04:40",
        "05:55"
      ]
    });
  }
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
        if (c <= 10) {
          todo[iCol][seasson][objNameDay].push(hour.textContent);
          iCol++;
        }
      });
    }
  });
}

app.use(cors());
// app.get("/api/", (req, res) => {
//   res.send("as");
// });
app.get("/api/timetables/:timeId/:way/:seasson/:dayofweek", (req, res) => {
  // setData(req, res);
  res.send({
    timetables: [
      "07:00",
      "07:25",
      "07:56",
      "08:21",
      "08:50",
      "09:15",
      "09:43",
      "10:11",
      "10:39",
      "11:07",
      "11:35",
      "12:03",
      "12:31",
      "12:59",
      "13:27",
      "13:55",
      "14:23",
      "14:51",
      "15:19",
      "15:47",
      "16:15",
      "16:41",
      "17:07",
      "17:31",
      "17:55",
      "18:19",
      "18:43",
      "19:07",
      "19:31",
      "19:55",
      "20:19",
      "20:43",
      "21:07",
      "21:31",
      "21:57",
      "22:23",
      "22:49",
      "23:16",
      "23:44",
      "",
      "00:14",
      "00:49",
      "01:20",
      "02:12",
      "03:27",
      "04:40",
      "05:55"
    ]
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
