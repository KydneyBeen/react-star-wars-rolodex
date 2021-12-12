import * as React from 'react';
import { ScrollerPerson } from './component-imports';
import { People } from '../../../utils/types';

interface Props {
  userList:Array<People>;
  openModal:Function;
}

export function Scroller (props:Props):JSX.Element {

  return (
    <div className="scroller-container">
      <div className="scroller-content">
        <ul className="list-group" id="user-list">
          {props.userList.map((user) => {
            return <ScrollerPerson user={user} openModal={(id) => props.openModal(id)} />
          })}
        </ul>
      </div>
    </div>
  )
}
