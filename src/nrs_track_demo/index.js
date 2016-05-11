import geocode from './js/geocode';
import Promise from 'bluebird';
import getURLParam from './js/get_url_param';
import { getEvents, pruneEvents, addCoordinatesToEvents, shortEvent } from './js/schedules';
import { drawMarker, drawPath, newMap } from './js/map';

const displayError = (error) => document.getElementById('loading').innerHTML =
  '<span>Some error happend, try to refresh the page.<br><br>' +
  'Произошла ошибка, попробуйте обновить страницу.<br><br>' +
  error + '</span>';

const handleFinalResult = function (map) {
  return function (events) {
    const pastEvents = events.filter((event) => Date.parse(event.start) <= Date.now());
    const futureEvents = events.filter((event) => Date.parse(event.start) > Date.now());

    drawPath(map, pastEvents, '#EF7831');
    drawPath(map, [pastEvents[pastEvents.length - 1], ...futureEvents], '#B93A1E');

    for (let i = 0; i < events.length; i++) {
      const current = Date.parse(events[i].start) <= Date.now() && Date.parse(events[i + 1].start) > Date.now();

      drawMarker(map, events[i], current);
    }

    document.getElementById('loading').remove();

    return events;
  };
};

window.initMap = function () {
  const map = newMap();
  const key = getURLParam('key');
  const calendarId = getURLParam('calendarId');

  if (!key || !calendarId) {
    document.getElementById('loading').innerHTML =
      '<span>Please provide key and calendarId<br><br>' +
      'Предоставьте key и calendarId пожалуйста</span>';

    return;
  }

  getEvents(key, calendarId).then(
    (response) => pruneEvents(response.items.map((obj) => shortEvent(obj)))
  ).then(
    (events) => Promise.all(events.map((event) => geocode(event.place))).then(addCoordinatesToEvents(events))
  ).then(
    handleFinalResult(map)
  ).then(
    (events) => window.events = events
  ).catch(
    displayError
  );
};
