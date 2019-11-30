import React from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon";
export default function WelcomeFooter() {
  return (
      <div className={'login-footer'}>
        <p className={'login-footer-icon'}>
          <span> <Icon href={"#iconweixin"}/></span>
          <span><Icon href={"#iconQQ"}/></span>
          <span><Link to={'/login'}><Icon href={"#iconshouji1"}/></Link></span>
        </p>
        <p className={'login-footer-privacy'}>
          登录即同意
          <Link to={'/privacy'}>《用户协议》</Link>
          和
          <Link to={'/agreement'}>《隐私声明》</Link>
        </p>
      </div>
  );
}