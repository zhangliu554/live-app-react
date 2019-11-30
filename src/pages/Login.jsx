import React,{Component} from 'react'
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Input from "../components/common/Input";
import {Link} from "react-router-dom"
import { Toast } from 'antd-mobile';
// const BASEURL = "http://39.98.126.184:8080/api";
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'password',
      show: true,
      telValue: '',
      pwdVal: "",
    }
  }
  render() {
    return (
        <div className={'login'}>
          <Header title={"账号登录"}/>
          <div className={'a-content'}>
            <label className={'my-label1'}>
              <span>
                <Icon href={'#iconwode'}/>
              </span>
              <input className={'my-input'} type='text' placeholder={'请输入手机号'} onChange={this.handelTelChange.bind(this)}/>
            </label>
            <Input href={'#iconmima1'} placeholder={'请输入密码'} type={this.state.type} show={this.state.show} change={this.handelPwdChange.bind(this)} click={this.getInputType.bind(this)}/>
            <div className={'go-register'}>
              <a href={'http://localhost:8080/user/setter/changepassword'} className={'forgetPass'}>忘记密码 ? </a>
              <Link className={'forgetPass'} to={'/register'}>立即注册</Link>
            </div>
            <button onClick={this.handelLogin.bind(this)} >登录</button>
          </div>
        </div>
    )
  }
  //密码可见与不可见
  getInputType() {
    let s = this.state.show;
    let t = null;
    if (s) {
      t = 'text'
    } else {
      t = 'password'
    }
    this.setState({
      show: !s,
      type: t
    });
  }
  //获取手机输入框的值
  handelTelChange(e){
    this.setState({
      telValue: e.target.value
    });
  }
  //获取密码框的值
  handelPwdChange(e) {
    this.setState({
      pwdVal: e.target.value
    });
  }
  handelLogin(){
    let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(this.state.telValue === ""){
      Toast.offline('手机号不能为空', 1)
    }else{
      if(!telReg.test(this.state.telValue )){
        Toast.offline('请输入正确的手机号', 1)
      }else{
        if(this.state.pwdVal === ""){
          Toast.offline('请输入密码', 1)
        }else{
          //fetch请求
          fetch('http://39.98.126.184:8080/api/user/login/',{
            method:"POST",
            headers:{
              "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
              "logname":this.state.telValue,
              "logpwd":this.state.pwdVal
            })
          }).then(res=>{
            res.json().then(data=>{
              // console.log(data)
              if(data.status===0){
                console.log(data.token);
                window.location.href='http://localhost:8080/home?token='+data.token;
              }else {
                // alert("手机号或密码错误，请重新登陆")
                Toast.offline('手机号或密码错误，请重新登陆', 1)
              }
            })
          })
        }
      }
    }
  }
}
