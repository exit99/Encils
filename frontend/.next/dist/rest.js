'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.websocket = exports.request = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeUrl = function makeUrl(endpoint) {
  return 'http://' + _config2.default.host + endpoint;
};

var request = function request(method, endpoint, data, success, err) {
  var options = {
    'method': method,
    'headers': {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };

  if (data !== null) {
    options.body = (0, _stringify2.default)(data);
  }

  var token = _reactCookie2.default.load("token");
  if (token !== null) {
    options.headers.Authorization = token;
  }

  return (0, _isomorphicFetch2.default)(makeUrl(endpoint), options).then(function (response) {
    var statusCode = response.status.toString();
    if (statusCode === '200' || statusCode === '201') {
      response.json().then(function (data) {
        success(data);
      });
    } else if (statusCode == '204') {
      success({});
    } else if (statusCode.startsWith('4')) {
      response.json().then(function (data) {
        err(data);
      });
    } else {
      console.error('Cannot handle HTTP code ' + statusCode + '!');
    }
  });
};

var websocket = function websocket(endpoint, onMessage, onLogin) {
  var token = _reactCookie2.default.load("token");
  var baseUrl = _config2.default.host;
  var ws = new WebSocket('ws://' + baseUrl + endpoint + '/?token=' + token + '/');
  ws.onmessage = function (_ref) {
    var data = _ref.data;

    data = JSON.parse(data);
    if (data.is_logged_in) {
      if (onLogin !== null) {
        onLogin();
      }
    } else {
      onMessage(data);
    }
  };
  return ws;
};

exports.request = request;
exports.websocket = websocket;