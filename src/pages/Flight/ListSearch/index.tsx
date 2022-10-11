import React, { FC, useEffect, useState } from 'react';
import Header from './Header';
import bgImage from "../../../images/flight.png";
import { Helmet } from 'react-helmet';
import { Card, Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './style.scss';
import CardList from './CardList';
import { priceDecimal } from '../../../utils/helper';

interface FlightJourneysProps {
  flightSegments?: any[]
}

interface ResponseGetFlightProps {
  errors?: any[]
  flightSchedules: any[]
}

interface PassengerProps {
  noOfAdt: string,
  noOfChd : string,
  noOfInf : string,
}

interface StateProps {
  responseGetFlight?: ResponseGetFlightProps
  noData?: boolean,
  cabin?: string,
  passenger: PassengerProps
  isRoundTrip: boolean
  passengerLength: number
}

interface LocationProps {
  state?: StateProps
}

interface ListSearchProps {
  location?: LocationProps
}

const ListSearch: FC<ListSearchProps> = (p) => {
  const history = useHistory();
  const state = p?.location?.state
  const dataFlight = state?.responseGetFlight?.flightSchedules[0]
  const dataJourneys = state?.responseGetFlight?.flightSchedules[0].flightJourneys
  const [selectedTicket, setSelectedTicket] = useState(Array())
  const [selectedPrice, setSelectedPrice] = useState(Array())
  const [showResult, setShowResult] = useState(false)
  const [showModalResult, setShowModalResult] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tripLength, setTripLength] = useState(1)

  useEffect(() => {
    if(state?.isRoundTrip) {
      setTripLength(2)
    }
  }, [])

  useEffect(() => {
    console.log('selectedPrice: ', selectedPrice)
    if(selectedPrice.length > 0) {
      const values = Object.values(selectedPrice);
      const updatePrice = values.reduce<number>((accumulator, value) => {
          return accumulator + value;
      }, 0);
      setTotalPrice(updatePrice)
      console.log('totalPrice: ', totalPrice)
    }
  }, [selectedPrice])

  useEffect(() => {
    console.log('selectedTicket: ', selectedTicket)
    if(selectedTicket.length == state?.passengerLength) {
      setShowResult(true)
    }
  }, [selectedTicket])

  useEffect(() => {
    if(state == undefined || !state) {
      history.push('/flights')
    }
  }, [])

  const handleClickNext = () => {
    history.push({
      pathname: `/flights/reservation`,
      state: {
        name: 'yuss'
          // responseGetFlight: res.data.data,
          // noData: noData,
          // passenger: {
          //     noOfAdt: passenger.adult,
          //     noOfChd : passenger.child,
          //     noOfInf : passenger.infant,
          // },
          // passengerLength: passengerLength,
          // cabin : classValue?.value,
          // isRoundTrip: isRoundTrip
      }
  })
  }

  useEffect(() => {
    console.log('state: ', state)
    console.log('passenger: ', state?.passenger)
    console.log('datJourneys: ', dataJourneys)
  }, [])

  const handleClickReset = () => {
    setSelectedTicket(Array())
    setSelectedPrice(Array())
    setTotalPrice(0)
    setShowModalResult(false)
    setShowResult(false)
  }

  if(state?.noData) {
    return (
      <div className="flight-list-empty">
        <div className="bg-flight">
          <img className="w-full" src={bgImage} alt="hero" />
        </div>
        <div className="mt-2">
          <span className="text-not-found">Data not found.</span>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <Helmet>
          <title>Caritempat</title>
        </Helmet>
        <div className="flight-list-container">
          <Header
            departure={dataFlight?.departureAirport?.name}
            departureCode={dataFlight?.departureAirport?.code}
            arrival={dataFlight?.arrivalAirport?.name}
            arrivalCode={dataFlight?.arrivalAirport?.code}
            timeDeparture={dataFlight?.flightJourneys[0]?.flightSegments[0]?.std}
            passenger={0}
            class={"Coming soon"}
          />
          <div className="body">
            <Row>
              <Col xs={1} sm={1} md={1}/>
                <Col xs={10} sm={12} md={5} className="content">
                  { dataJourneys && dataJourneys.map((a: any, index: number) => (
                    <CardList
                      key={index}
                      airline={a.flightSegments[0].airline.name}
                      price={a.flightSegments[0].fares[0].paxFareAdultIDR}
                      departureAirport={a.departureAirport.code}
                      arrivalAirport={a.arrivalAirport.code}
                      duration={a.duration}
                      std={a.flightSegments[0].std}
                      sta={a.flightSegments[0].sta}
                      isRoundTrip={state?.isRoundTrip}
                      onClick={()=> {
                        let addTicket = [...selectedTicket]
                        let addPrice = [...selectedPrice]
                        if(!state.isRoundTrip) {
                          if(addTicket.length == 1) {
                            let updateData = []
                            updateData.push(a)
                            setSelectedTicket(updateData)

                            //price
                            let updatePrice = []
                            updatePrice.push(a.flightSegments[0].fares[0].paxFareAdultIDR)
                            setSelectedPrice(updatePrice)
                          }
                          else {
                            addTicket.push(a)
                            setSelectedTicket(addTicket)

                            //price
                            addPrice.push(a.flightSegments[0].fares[0].paxFareAdultIDR)
                            setSelectedPrice(addPrice)
                          }
                        }
                        else {
                          if(addTicket.length == 2) {

                          }
                          else {
                            addTicket.push(a)
                            setSelectedTicket(addTicket)
                            
                            //price
                            addPrice.push(a.flightSegments[0].fares[0].paxFareAdultIDR)
                            setSelectedPrice(addPrice)
                          }
                        }
                      }}
                    />
                  ))}
                </Col>
              <Col xs={1} sm={1} md={1}/>
            </Row>
          </div>
        </div>
        <div className={`pb-3 pt-3 flight-ticket-result bg-warning ${showResult ? '' : 'hidden'}`}>
          <Row className="body">
            <Col xs={12} sm={12} md={6} className="d-flex justify-content-center align-items-center">
              <div className="detail-left">
                <span className="total">Rp {priceDecimal(totalPrice)}</span>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="detail-right">
                <div className="d-flex justify-content-center align-items-center mr-3">
                  <a onClick={()=> setShowModalResult(true)} className="show-button">
                    <span>Show</span>
                  </a>
                </div>
                { tripLength == selectedTicket?.length ?
                  (
                    <div className="btn btn-next" onClick={handleClickNext}>
                      Lanjutkan
                    </div>
                  ) : null
                }
              </div>
            </Col>
          </Row>
        </div>
        <Modal 
          show={showModalResult} 
          size="lg"
          centered
          onHide={()=> setShowModalResult(false)}
        >
          <Modal.Body>
            <div className="modal-result">
              <span className="title">Tiket {state?.isRoundTrip ? `Pergi - Pulang` : `Pergi`}</span>
              <div className="header">
                <span className="reset mr-3" onClick={handleClickReset}>Reset Pilihan</span>
                <span className="reset mr-3" onClick={()=> setShowModalResult(false)}>Close</span>
              </div>
            </div>
            <Col xs={12} sm={12} md={12} className="mt-4">
              { selectedTicket && selectedTicket.map((a: any, index: number) => (
                <CardList
                  key={index}
                  airline={a.flightSegments[0].airline.name}
                  price={a.flightSegments[0].fares[0].paxFareAdultIDR}
                  departureAirport={a.departureAirport.code}
                  arrivalAirport={a.arrivalAirport.code}
                  duration={a.duration}
                  std={a.flightSegments[0].std}
                  sta={a.flightSegments[0].sta}
                  isRoundTrip={state?.isRoundTrip}
                  onClick={()=> null}
                />
              ))}
            </Col>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ListSearch
