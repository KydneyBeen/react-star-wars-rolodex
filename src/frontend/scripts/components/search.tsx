import * as React from 'react';

export function Search (props) {
  return (
    <div id="search">
      <input type="number" placeholder="?   Search by ID" onKeyUp={(event) => props.searchById(event)} onBlur={(event) => props.searchById(event)} />
    </div>
  )
}