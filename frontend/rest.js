import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import config from './config';
import promise from 'es6-promise';

import 'whatwg-fetch'

const makeUrl = (endpoint) => { 
  return `http://${config.host}${endpoint}`
}

const request = (method, endpoint, data, success, err) => {
    let options = {
      'method': method,
      'headers': {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    };

    if (data !== null) { options.body = JSON.stringify(data); }

    const token = cookie.load("token");
    if (token !== null) { options.headers.Authorization = token; }

    return fetch(makeUrl(endpoint), options).then((response) => {
      const statusCode = response.status.toString();
      if (statusCode === '200' || statusCode === '201') { 
        response.json().then((data) => { success(data) }); 
      } else if (statusCode == '204') {
        success({});
      } else if (statusCode.startsWith('4')) {
        response.json().then((data) => { err(data) });
      } else {
        console.error(`Cannot handle HTTP code ${statusCode}!`);
      }
    });
}

const websocket = (endpoint, onMessage, onLogin) => {
    const token = cookie.load("token");
    const baseUrl = config.host;
    const ws = new WebSocket(`ws://${baseUrl}${endpoint}/?token=${token}`)
    ws.onmessage = ({ data }) => { 
      data = JSON.parse(data);
      if (data.is_logged_in) {
        if(onLogin !== null) { onLogin(); }
      } else {
        onMessage(data); 
      }
    }
    return ws;
}


export { request, websocket }
