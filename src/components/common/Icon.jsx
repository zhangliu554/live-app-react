import React from 'react';
export default function Icon({href}) {
  return (
      <svg className="icon iconphone" aria-hidden="true">
        <use xlinkHref={href}/>
      </svg>
  );
}
