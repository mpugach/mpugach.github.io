import { summaryRegex, usStateRegex } from './constants';
import ajax from './ajax';
import notify from './notify';

function clearPlace(string) {
  let result = string
    .replace(summaryRegex, '')
    .replace(/mayapura/ig, 'Mayapur')
    .replace(/murwillambah/ig, 'Murwillumbah')
    .trim();

  if (usStateRegex.test(result)) result = result + ', USA';
  if (result === '') notify('filtered out: ' + string);

  return result;
};

export function shortEvent(obj) {
  return {
    place: clearPlace(obj.summary),
    start: obj.start.date,
  };
};

export function pruneEvents(events) {
  let result = [events[0]];

  for (let i = 1; i < events.length; i++) {
    if (result[result.length - 1].place !== events[i].place) result.push(events[i]);
  }

  return result;
};

export function getEvents(key, calendarId) {
  const today = new Date();
  const timeMin = (new Date(today.setMonth(today.getMonth() - 6))).toISOString();
  const timeMax = (new Date(today.setMonth(today.getMonth() + 8))).toISOString();

  return ajax.get(
    'https://clients6.google.com/calendar/v3/calendars/' + calendarId + '/events',
    {
      calendarId,
      key,
      maxAttendees: 1,
      maxResults: 1000,
      orderBy: 'startTime',
      singleEvents: true,
      timeMax,
      timeMin,
    }
  );
};

export function addCoordinatesToEvents(events) {
  return function (geocoded) {
    let result = [];

    for (let i = 0; i < events.length; i++) {
      if (geocoded[i]) {
        result.push({
          ...events[i],
          lat: parseFloat(geocoded[i].lat),
          lng: parseFloat(geocoded[i].lon),
        });
      } else {
        if (events[i].place !== '') notify('can not find: ' + events[i].place);
      }
    }

    return result;
  };
};
