import React from 'react'
import './HeaderComp.css'
const HeaderComp = () => {
  return (
    <div className='main-header'>
      <h4 style={{textAlign:'center'}}><i className='fa fa-cloud'></i>&nbsp;WEATHER APP</h4>
        <ul className='navbar'>
          <li>Home</li>
          <li>About</li>
          <li>Download</li>
          <li>Contact Us</li>
        </ul>
    </div>
  )
}

export default HeaderComp