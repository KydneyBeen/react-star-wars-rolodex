import * as React from 'react';

export function ModalSection (props) {
  return (
    <div className="section" style={{width:props.width}}>
      {props.title ?
        <h1>{props.title}</h1>
        : ''
      }
      { props.attributes.map((attribute) => {
        return (
          <p>
            { attribute.key ?
              <strong>{attribute.key}: </strong>
              : ""
            }
            { Array.isArray(attribute.value) ? 
              attribute.value.map((attr) => {
                return (
                  <p>
                    <strong>{ attr.key }: </strong>
                    <span>{ attr.value } </span>
                  </p>
                )
              })
              : <span>{ attribute.value || "N/A" }</span>
            }
          </p>
        )
      }) }
    </div>
  )
}