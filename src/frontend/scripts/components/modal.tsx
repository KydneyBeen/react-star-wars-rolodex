import * as React from 'react';
import { ModalSection } from './modal-section';

export function Modal (props) {
  const userDetail = JSON.parse(props.userDetail);
  const sections = [
    {
      title: "Physical",
      attributes: [
        { key: 'Gender', value: userDetail.gender },
        { key: 'Birth Year', value: userDetail.birth_year },
        { key: 'Hair Color', value: userDetail.hair_color },
        { key: 'Skin Color', value: userDetail.skin_color },
        { key: 'Height', value: userDetail.height + 'cm' },
        { key: 'Mass', value: userDetail.mass + 'kg' }
      ]
    },
    {
      title: "Species",
      attributes: [
        ...userDetail.species.map((species) => {
          return {value: [
            { key: "Name", value: species.name},
            { key: "Language", value: species.language },
            { key: "Classification", value: species.classification },
            { key: "Average Lifespan", value: species.average_lifespan },
          ]}
        })
      ]
    },
    {
      title: "Home world",
      attributes: [
        { key: 'Name', value: userDetail.homeworld.name },
        { key: 'Population', value: userDetail.homeworld.population },
        { key: 'Terrain', value: userDetail.homeworld.terrain },
      ]
    },
    {
      title: "As seen in",
      attributes: [
        ...userDetail.films.map((film) => {
          return {
            value: <span><strong>{film.title}</strong> ({film.release_date}) directed by {film.director} and produced by {film.producer}</span>
          }
        })
      ]
    }
  ]
  return (
    <div className="modal" style={{display:"block"}}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="user-modal modal-content">
          <div className="modal-header flex-lg-column">
            <h1>{userDetail.name}</h1>
          </div>
          <div className="modal-body">
            { sections.map((section) => {
              return <ModalSection title={section.title} attributes={section.attributes} />
            })}
          </div>
          <div className="modal-footer">
            <button onClick={() => props.closeModal()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}