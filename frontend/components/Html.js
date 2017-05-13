import React from 'react'
import Head from 'next/head'
export default ({ children }) => (
  <div>
    <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <title>School Text App</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script>

      <style>{`
        .nav-wrapper {
          background: #F7971E;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #FFD200, #F7971E);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #FFD200, #F7971E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }

        .header {
          color: white;
        }

        .btn-large, .btn {
          background: #44adff;
        }

        .btn-large:hover, .btn:hover {
          background: #9dd2fb;
        }

        .icon-block .material-icons, .tabs .tab a {
          color: #f7971e;
        }

        .tabs .tab a:hover {
          color: #FFD200;
        }

        .selected-item {
          background: #F7971E;
        }

        input:not([type]):focus:not([readonly]), input[type=text]:focus:not([readonly]), input[type=password]:focus:not([readonly]), input[type=email]:focus:not([readonly]), input[type=url]:focus:not([readonly]), input[type=time]:focus:not([readonly]), input[type=date]:focus:not([readonly]), input[type=datetime]:focus:not([readonly]), input[type=datetime-local]:focus:not([readonly]), input[type=tel]:focus:not([readonly]), input[type=number]:focus:not([readonly]), input[type=search]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
          border-bottom: 1px solid #44adff;
          box-shadow: 0 1px 0 0 #44adff;
        }
      `}</style>
    </Head>
    { children }
  </div>
)
