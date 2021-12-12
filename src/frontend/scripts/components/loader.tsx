import * as React from 'react';
import language from '../../../utils/language';

export function Loader ():JSX.Element {
  return (
    <div className="backer">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">{language.loading}</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">{language.loading}</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">{language.loading}</span>
      </div>
    </div>
  )
}