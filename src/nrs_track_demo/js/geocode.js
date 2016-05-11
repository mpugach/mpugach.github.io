import Ajax from './ajax';

export default function geocode(query) {
  return Ajax.get(
    'http://nominatim.openstreetmap.org/search',
    {
      q: query, // eslint-disable-line id-length
      format: 'json',
      addressdetails: 1,
      polygon: 1,
    }
  ).then(
    (response) => response.filter((obj) => obj.type === 'city')[0]
  );
};
