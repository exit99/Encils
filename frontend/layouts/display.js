import React from 'react';
import Head from 'next/head'
import Html from '../components/Html';
import Spinner from '../components/Spinner';

export default ({ children, text, showSpinner }) => (
  <Html>
    <Head>
      <style>{`
        body { 
          background-image: url('/static/hot-air-balloon.jpeg');
          background-size: cover;
        }
      `}</style>
    </Head>

    <div className="grey lighten-2 z-depth-2" style={ {
      "position": "fixed",
      "top": "0",
      "width": "100%",
      "opacity": ".2",
      "height": "4.5em"
    } }>
    </div>
    <center><h4 style={{ color: "black" }}><b>{ showSpinner ? "Loading..." : text }</b></h4></center>

    { showSpinner ? <center><br /><br /><Spinner /></center> : children }
  </Html>
)
