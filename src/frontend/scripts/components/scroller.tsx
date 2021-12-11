import * as React from 'react';
import { ScrollerPerson } from './component-imports';

export function Scroller (props) {

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