import React from 'react'

const Events = ({ events, filter }) => {
  console.log(events)
  const eventsToShow = events.filter(e => e.ainejärjestö.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <ul>
      {eventsToShow.map((e, i) => <li key={i}>{e.ainejärjestö}: {e.name}</li>)}
      </ul>
     </div>
  )}


export default Events