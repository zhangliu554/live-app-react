import React from "react";
import { Link} from 'react-router-dom'
export default function StepThree() {
  return (
      <div className={'three'}>
        <Link to={'/welcome'} tag={"span"} className={'go-login'}>立即体验</Link>
      </div>
  );
}