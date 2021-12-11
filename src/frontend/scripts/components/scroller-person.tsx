import * as React from 'react';

export function ScrollerPerson (props) {
  return (
    <li className="list-group-item person" id={props.user.id}>
      <a onClick={() => props.openModal(props.user.id)}>{props.user.name}</a>
    </li>
  )
}