import React from 'react'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

// library.add(faLinkedin, faLinkedinIn)

export const About = () => {
  return (
    <div className="about">
      <h1 id="title h1">
        <h3>Welcome to Codelingo!</h3>
      </h1>
      {/* <FontAwesomeIcon icon="linkedin" /> */}

      <p id="">
        Codelingo is an app for learning how to code with Javascript. Made for
        you by McRae, Amanda, Camryn, and Rhianna!
      </p>
      <div className="about-images">
        <a href="https://www.linkedin.com/in/mcraepetrey/">
          <img id="about" src={'/assets/McRae.png'} alt={'mcrae'} />
        </a>

        <a href="https://www.linkedin.com/in/amanda-gonzalez/">
          <img id="about" src={'/assets/Amanda.jpeg'} alt={'amanda'} />
        </a>
        <a href="https://www.linkedin.com/in/camrynpearson/">
          <img id="about" src={'/assets/camryn.jpeg'} alt={'camryn'} />
        </a>
        <a href="https://www.linkedin.com/in/rhiannalarocque/">
          <img id="about" src={'/assets/profile.png'} alt={'rhianna'} />
        </a>
      </div>
    </div>
  )
}

export default About
