import React, { FC, useEffect, useState } from 'react';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import Header from './CardHeader';
import { Col, Form } from 'react-bootstrap';
import DataReservation from './DataReservation';
import Regulation from './Regulation';

interface StateProps {
  name?: string
  // responseGetFlight?: ResponseGetFlightProps
  // noData?: boolean,
  // cabin?: string,
  // passenger: PassengerProps
  // isRoundTrip: boolean
  // passengerLength: number
}

interface LocationProps {
  state?: StateProps
}

interface FlightReservationProps {
  location?: LocationProps,
}

const FlightReservation: FC<FlightReservationProps> = (p) => {
  const [showModalForm, setShowModalForm] = useState(false)
  const [isTraveler, setIsTraveler] = useState(false)
  useEffect(() => {
    console.log('p: ', p)
  }, [p])

  const param = {
    // ...p,
    showModalForm,
    setShowModalForm,
    isTraveler,
    setIsTraveler
  }
  return (
    <div className="reservation-wrapper">
      <div className="row d-flex justify-content-center">
        <div className="col col-md-6 col-sm-12 col-xs-12">
         <DataReservation {...param}/>
        </div>
        <div className="col col-md-4 col-sm-12 col-xs-12">
          <Regulation/>
        </div>
      </div>
    </div>
  )
}

export default FlightReservation
