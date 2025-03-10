import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Footer from '../FooterComponent/FooterComponent'
import './DefaultComponent.css';

const DefaultComponent = ({children}) => {
  return (
    <div className="wrapper">
        <HeaderComponent/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default DefaultComponent