import React from 'react'


const Markers = (locals) => {
  console.log('Markers: ', locals)
  return (
    locals.map(
      (local) => {
        return( <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><img src="pin.png" /></Marker> )}
    )
  )
}

export default Markers;
