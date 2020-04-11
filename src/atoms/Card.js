import React from 'react'

export const Card = props => {
  const { name, gender, status, image, species, episode } = props.data

  return (
    <article className='card'>
      <img src={image} alt={name}></img>
      <div className='content'>
        <h4>{name}</h4>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
        <span>Specie: {species}</span>
        <span>Gender: {gender}</span>
        <span>Episodes: {episode && episode.length}</span>
      </div>
    </article>
  )
}
