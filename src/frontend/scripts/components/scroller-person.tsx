import * as React from 'react';
import { People } from '../../../utils/types';

interface Props {
  openModal:Function;
  user:People;
}

/*
* Each person name in the list container
*/
export function ScrollerPerson (props:Props):JSX.Element {
  return (
    <li className="list-group-item person" id={'' + props.user.id}>
      <a onClick={() => props.openModal(props.user.id)}>{props.user.name}</a>
    </li>
  )
}