import React from 'react'
import WelcomeHeader from "../components/Welcome/WelcomeHeader";
import WelcomeFooter from "../components/Welcome/WelcomeFooter";
export default function Welcome() {
  return (
      <div className={'Welcome'}>
        <WelcomeHeader/>
        <WelcomeFooter/>
      </div>
  )
}