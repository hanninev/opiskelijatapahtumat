import React from 'react'

const Events = ({ event }) => {
  console.log(event)
  return (
    <div>
      <ul>
      {event.map((e, i) => <li key={i}>{e.ainejärjestö}: {e.name}</li>)}
      </ul>
     </div>
  )}


export default Events