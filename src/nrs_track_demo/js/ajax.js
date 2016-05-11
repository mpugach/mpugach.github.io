import Promise from 'bluebird';

const Ajax = {};

Ajax.send = function (url, method, data, async) {
  return new Promise(function (resolve, reject) {
    if (async === undefined) {
      async = true;
    }

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error('There was a problem with the request.\nStatus:' + xhr.status));
        }
      }
    };

    xhr.onerror = () => reject(Error('There was a network error.'));
    xhr.send(data);
  });
};

Ajax.get = function (url, data, async) {
  var query = [];

  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }

  return Ajax.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, async);
};

export default Ajax;
