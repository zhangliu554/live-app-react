import React from "react";
export default function Header({title}){
    return (
        <div className="a-header">
        <span onClick={() => window.history.go(-1)}>
          <svg className="icon iconweixin" aria-hidden="true">
            <use xlinkHref="#iconarrow-left"/>
          </svg>
        </span>
          <h3>{title}</h3>
        </div>
    )
}