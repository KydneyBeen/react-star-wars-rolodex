import * as React from 'react';
import language from '../../../utils/language';

interface KeyValue {
  key: string;
  value: string;
}

interface Props {
  title?:string;
  attributes: Array<Array<KeyValue>>;
}

/*
* Each block of modal content
*/
export function ModalSection (props:Props):JSX.Element {
  const keyvalue = (param:KeyValue):JSX.Element => {
    return (
      <p>
        <strong>{param.key}: </strong>
        <span>{param.value}</span>
      </p>
    )
  }
  return (
    <div className="section">
      {props.title ? <h1>{props.title}</h1> : '' }
      {props.attributes.map((attribute: Array<KeyValue>) => {
        return <p>{attribute.map(keyvalue)}</p>
        }) || <p><strong>{language.snippet_unknown}</strong></p>}
    </div>
  )
}