import React from 'react';
import Icon from "./Icon";
export default function Input({ href, type , show ,change, click }) {
  return (
      <label className={'my-label'}>
        <span><Icon href={href}/></span>
        <input className={'my-input'} type={type} placeholder={'请输入6-12位密码'} onChange={change}/>
        <span className={'icon-right'} onClick={click}>
          {show ? [<Icon key={1} href={'#iconmimayincang1'}/>] : [<Icon key={2} href={'#iconmimayincang'}/>]}
         </span>
      </label>
  )
}