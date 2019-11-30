import React , {Component} from "react";
import Swiper from 'swiper/js/swiper'
import 'swiper/css/swiper.css'
import StepOne from "../components/Step/StepOne";
import StepTwo from "../components/Step/StepTwo";
import StepThree from "../components/Step/StepThree";
export default class MySwipet extends Component {
  render() {
    return (
        <div className="swiper-container" ref="lun">
          <div className="swiper-wrapper">
            <div className="swiper-slide" data-id="0"><StepOne/></div>
            <div className="swiper-slide" data-id="1"><StepTwo/></div>
            <div className="swiper-slide" data-id="2"><StepThree/></div>
          </div>
        </div>
    );
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      loop: false,     //循环
      effect:'slide',
      touchReleaseOnEdges:true,
    })
  }
}

