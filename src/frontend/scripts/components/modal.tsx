import * as React from 'react';
import constants from '../../../utils/constants';
import language from '../../../utils/language';
import { Film, PersonDetail, Species } from '../../../utils/types';
import { ModalSection } from './modal-section';

interface Props {
  userDetail:string;
  closeModal:Function;
}

/*
* The Modal containing the person details (Each group of details is a child component)
*/
export function Modal (props:Props):JSX.Element {
  const userDetail:PersonDetail = JSON.parse(props.userDetail);
  const sections = [
    {
      title: language.title_section_personal,
      attributes: [
        [
          { key: language.label_gender, value: userDetail.gender },
          { key: language.label_birth, value: userDetail.birth_year },
          { key: language.label_hair, value: userDetail.hair_color },
          { key: language.label_skin, value: userDetail.skin_color },
          { key: language.label_height, value: userDetail.height + language.snippet_cm },
          { key: language.label_mass, value: userDetail.mass + language.snippet_kg }
        ]
      ]
    },
    {
      title: language.title_section_species,
      attributes: [
        ...userDetail.species.map((species:Species) => {
          return [
            { key: language.label_species, value: species.name},
            { key: language.label_lang, value: species.language },
            { key: language.label_class, value: species.classification },
            { key: language.label_lifespan, value: species.average_lifespan },
          ]
        })
      ]
    },
    {
      title: language.title_section_planet,
      attributes: [
        [
          { key: language.label_planet, value: userDetail.homeworld.name },
          { key: language.label_population, value: userDetail.homeworld.population },
          { key: language.label_terrain, value: userDetail.homeworld.terrain }
        ]
      ]
    },
    {
      title: language.title_section_films,
      attributes: [
        userDetail.films.map((film:Film) => {
          const year:string = film.release_date.match(constants.year_pattern)[0];
          return {
            key: `${film.title} (${year})`,
            value: language.content_film(film.director, film.producer)
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
            <button onClick={() => props.closeModal()}>{language.button_close}</button>
          </div>
        </div>
      </div>
    </div>
  )
}