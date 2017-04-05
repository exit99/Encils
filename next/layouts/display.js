import React from 'react';
import Html from '../components/Html';

const questionHeader = {
    "position": "fixed",
    "top": "0",
    "width": "100%",
    "opacity": ".2",
    "height": "4.5em"
}

export default ({ children, text }) => (
  <Html>
    <body style={ {"background-image": "url('/static/hot-air-balloon.jpeg')", "background-size": "cover"} }>
        <div className="grey lighten-2 z-depth-2" style={ questionHeader }>
        </div>
        <center><h4 style={{ color: "black" }}><b>{ text }</b></h4></center>

        { children }
    </body>
  </Html>
)
