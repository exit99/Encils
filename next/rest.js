import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';

const makeUrl = (endpoint) => { 
  return "http://127.0.0.1:8000" + endpoint 
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
      const func = response.status.toString().startsWith("2") ? success : err;
      if (func !== null) { response.json().then((data) => { func(data) }); }
    });

}

const websocket = (endpoint, onMessage, onLogin) => {
    const token = cookie.load("token");
    const baseUrl = "localhost:8000";
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
