import React from 'react'
import Router from 'next/router'
import MainLayout from '../layouts/main'

const parallaxStyle = {
  display: "block",
  width: '100%'
};

export default () => (
  <MainLayout>
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container">
          <br /><br />
          <h1 className="header center">Engage Better & Teach Better</h1>
          <div className="row center">
            <h5 className="header col s12 light">Using our text based teaching platform</h5>
          </div>
          <div className="row center">
            <a onClick={() => Router.push("/login")} className="btn-large waves-effect waves-light">Get Started</a>
          </div>
          <br /><br />

        </div>
      </div>
      <div className="parallax"><img src="/static/class.jpeg" alt="Unsplashed background img 1" style={parallaxStyle} /></div>
    </div>


    <div className="container">
      <div className="section">

        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><i className="material-icons">textsms</i></h2>
              <h5 className="center">Text based answering</h5>

              <p className="light">Engage students and generate discussion like never before.  Create assignments and display them on a screen in the front of the classroom. Students are givin a phone number to text their answers to.  When an answer is recevied it is displayed on the screen with their names.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
              <h5 className="center">One-click grading</h5>

              <p className="light">We have simplified grading down into 4 buttons.  Our goal is to make grading a no-paper, no-hassle activity to give you more time for teaching.  All questions are automatically saved to our platoform where you can easily grade and export assignments to your favorite gradebook.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><i className="material-icons">assessment</i></h2>
              <h5 className="center">Track student performance</h5>

              <p className="light">We provide detailed graphs on each individual student as well as classes to help you understand how your students are progressing. Now you can know you increased your students knowledge by 110%.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </MainLayout>
)
