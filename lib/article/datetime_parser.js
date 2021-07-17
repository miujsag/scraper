const {
  getYear,
  addMinutes,
  addHours,
  subMinutes,
  startOfDay,
  parseISO,
} = require("date-fns");

const dates = [
  "4 perce",
  "ma 19:41",
  "2019-01-14",
  "2019. 01. 11.",
  "2019.01.14 18:21",
  "2019.01.14. 18:51",
  "január 14. | 14:00",
  "2019. 01. 14. 20:00",
  "2019. jan. 13., 13:12",
  "2019. január 14. 19:07",
  "2019. január. 14. 20:00",
  "/ 2018.08.03., péntek 13:00 /",
  "2019. január 14. hétfő 12:20",
  "2019. január 14. hétfő, 16:47",
  "2019. január 14., hétfő 17:45",
  "újságíró . 2019. 01. 14. 20:17",
  "2019. január 14. 20:15 - szerző: Mészáros Márton",
  "2018. április 10., kedd 10:43, frissítve: kedd 11:55",
];

const minutesAgoPattern = /perc/;
const minutePattern = /\d+/;
const timePattern = /(\d{2}):(\d{2})/;
const todayPattern = /ma/;
const datetimePattern =
  /(?:.*(?<year>\d{4}))?.*?(?<month>\d{2}|jan|feb|már|ápr|máj|jún|júl|aug|sze|okt|nov|dec).*?(?<day>\d{1,2})(?:(?:.*(?<time>(\d{2}):(\d{2})))|)/;

function toDatetime(datetime) {
  const year = datetime.year ? datetime.year.trim() : getYear(new Date());
  const month = parseMonth(datetime.month);
  const time = datetime.time ? datetime.time.trim() : "00:00";
  const [hours, minutes] = time.split(":");
  const date = parseISO(`${year}-${month}-${datetime.day}`);

  return addMinutes(addHours(date, hours), minutes);
}

function formatMinutesAgo(datetime) {
  const [match] = datetime.match(minutePattern);
  const today = new Date();

  return subMinutes(today, match);
}

function formatToday(datetime) {
  const today = startOfDay(new Date());
  const [match] = datetime.match(timePattern);
  const [hours, minutes] = match ? match.split(":") : ["00", "00"];

  return addMinutes(addHours(today, hours), minutes);
}

function parseMinutesAgo(datetime) {
  const matches = datetime.match(minutesAgoPattern);

  if (matches && matches.length) {
    const formattedDate = formatMinutesAgo(datetime);

    return [datetime, formattedDate];
  } else {
    return [datetime, false];
  }
}

function parseToday([datetime, candidate]) {
  if (candidate) {
    return [datetime, candidate];
  }

  const matches = datetime.match(todayPattern);

  if (matches && matches.length) {
    const formattedDate = formatToday(datetime);

    return [datetime, formattedDate];
  } else {
    return [datetime, false];
  }
}

function parseDateTime([datetime, candidate]) {
  if (candidate) {
    return candidate;
  }

  const matches = datetime.match(datetimePattern);

  return toDatetime(matches.groups);
}

function parseMonth(month) {
  const months = {
    jan: "01",
    feb: "02",
    már: "03",
    ápr: "04",
    máj: "05",
    jún: "06",
    júl: "07",
    aug: "08",
    sze: "09",
    okt: "10",
    nov: "11",
    dec: "12",
  };

  return months[month] || month;
}

function parse(datetime) {
  if (!datetime) {
    return "";
  }

  const cleanedDateTime = datetime
    .replace(/<(?:.|\n)*?>/gm, "")
    .replace(/\s\s+/g, " ")
    .trim();

  return parseDateTime(parseToday(parseMinutesAgo(cleanedDateTime)));
}

function test() {
  dates.forEach(function (date) {
    console.log({ date, parsed: parse(date) });
  });
}

module.exports = {
  parse,
  test,
};
