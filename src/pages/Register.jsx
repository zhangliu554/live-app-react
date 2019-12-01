import React,{Component} from 'react'
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Input from "../components/common/Input";
import { Toast } from 'antd-mobile';
const BASEURL = "http://39.98.126.184:8080/api";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type1: 'password',
      type2: 'password',
      show1: true,
      show2: true,
      code: '验证码',
      telValue: '',
      timer: 60,
      pass: true,
      pwdVal: '',
      rePwdVal: '',
      regVal: '',
      regCode:'',
      flag:false
    }
  }
  render() {
    let type1 = this.state.type1;
    let type2 = this.state.type2;
    let code = this.state.code;
    let timer = this.state.timer;
    return (
          <div className={'login'}>
            <Header title={"账号注册"}/>
            <div className={'a-content'}>
              <label className={'my-label1'}>
              <span>
                <Icon href={'#iconwode'}/>
              </span>
                <input className={'my-input'} type='text' placeholder={'请输入手机号'} onChange={this.handelTelChange.bind(this)}/>
              </label>
              <Input href={'#iconmima1'} type={type1} show={this.state.show1} change={this.handelPwdChange.bind(this)} click={this.getInputType1.bind(this)}/>
              <Input href={'#iconmima1'} type={type2} show={this.state.show2} change={this.handelRePwdChange.bind(this)} click={this.getInputType2.bind(this)}/>
              <label className={'my-label'}>
              <span>
                <Icon href={'#iconshoujiyanzhengma'}/>
              </span>
                <input className={'my-input'} type='text' placeholder={'点击发送验证码'} onChange={this.handelRegChange.bind(this)}/>
                {
                  this.state.pass ? [<span key={3} className={'pass-code'} onClick={this.handelRegister.bind(this)}>{code}</span>] : [<span key={4} className={'pass-timer'}>{timer}秒后重发</span>]
                }
              </label>
              <button onClick={this.handelSend.bind(this)}>注册</button>
            </div>
          </div>
    )
  }
  //密码框可见与不可见
  getInputType1() {
    let s1 = this.state.show1;
    let t1 = null;
    if (s1) {
      t1 = 'text'
    } else {
      t1 = 'password'
    }
    this.setState({
      show1: !s1,
      type1: t1
    });
  }
  //确认密码框可见与不可见
  getInputType2() {
    let s2 = this.state.show2;
    let t2 = null;
    if (s2) {
      t2 = 'text'
    } else {
      t2 = 'password'
    }
    this.setState({
      type2: t2,
      show2: !s2
    });
  }
  //获取手机号框的值
  handelTelChange(e) {
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
  //获取确认密码框的值
  handelRePwdChange(e) {
    this.setState({
      rePwdVal: e.target.value
    });
  }
  //获取验证码框的值
  handelRegChange(e) {
    this.setState({
      regVal: e.target.value
    });
  }
  //发送验证码
  handelRegister() {
    let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    let pwdReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,12}$/ ;
    if (this.state.telValue === "") {
      Toast.offline('手机号不能为空', 2)
    } else {
      if (!telReg.test(this.state.telValue)) {
        Toast.offline('请输入正确的手机号', 2)
      } else {
        if (this.state.pwdVal === "") {
          Toast.offline('请输入密码', 2)
        } else {
          if (!pwdReg.test(this.state.pwdVal)) {
            Toast.offline('密码由6-12位数字、字母、特殊字符组成', 3)
          } else {
            if (this.state.rePwdVal === "") {
              Toast.offline('确认密不能为空', 2)
            } else {
              if (this.state.pwdVal !== this.state.rePwdVal) {
                Toast.offline('两次密码不一致', 2)
              } else {
                this.setState({
                  flag: true
                });
                //fetch 请求验证码
                fetch(`${BASEURL}/user/send_code/?phone=${this.state.telValue}`).then(res=>{
                  res.json().then(data=>{
                    // console.log(data.status);
                    this.setState({
                      regCode: data.status
                    });
                    if(this.state.regCode === 1){
                      Toast.offline('用户已存在，可以去登陆了哦', 2)
                    }else{
                      this.setState({
                        pass: !this.state.pass,
                      });
                      let siv = setInterval(() => {
                        // eslint-disable-next-line react/no-direct-mutation-state
                        this.setState({timer: (--this.state.timer)}, () => {
                          if (this.state.timer === 0) {
                            clearInterval(siv);
                            this.setState({
                              code: '重新发送',
                              timer: 60,
                              pass: !this.state.pass
                            })
                          }
                        });
                      }, 1000);
                    }
                  })
                });
              }
            }
          }
        }
      }
    }
  }
  //发送注册请求
  handelSend() {
    if(this.state.regVal !== "" && this.state.flag){
      fetch(`${BASEURL}/user/regist/`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
              "phone":this.state.telValue,
              "password":this.state.rePwdVal,
              "code":this.state.regVal
            })
      }).then(res=>{
        res.json().then(data=>{
          // console.log(data);
          if(data.status===0){
            this.props.history.push("/login");
          }else{
            Toast.offline('用户已存在，可以去登陆了哦', 2)
          }
        })
      })
    }else{
      Toast.offline('请输入正确的注册信息', 2)
    }
  }
}



