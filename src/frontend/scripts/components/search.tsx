import * as React from 'react';
import language from '../../../utils/language';

export function Search (props: { ['searchById']:Function }):JSX.Element {
  return (
    <div id="search">
      <input type="number" placeholder={language.search_placeholder} onKeyUp={(event) => props.searchById(event)} onBlur={(event) => props.searchById(event)} />
    </div>
  )
}