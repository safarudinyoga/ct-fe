import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import './style.scss';
import { priceDecimal } from '../../../../utils/helper';

interface DurationProps {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface CardListProps {
    airline: string
    price: number
    departureAirport: string
    arrivalAirport: string
    std: string
    sta: string
    duration: DurationProps
    isRoundTrip?: boolean
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardList = (props: CardListProps) => {
  return (
    <Card className="card-wrapper" onClick={props.onClick}>
        <Row>
            <Col xs={12} sm={6} md={6} className="d-flex justify-content-center pl-4">
                <i className={`text-2xl text-neutral-6000 purple las la-plane mr-1 icon`}></i>
                <span className="text-header mr-4">{props.airline}</span>
            </Col>
            <Col xs={12} sm={6} md={6} className="d-flex justify-content-center">
                <span className="text-header">Rp {priceDecimal(props.price.toString())} / orang</span>
            </Col>
            </Row>
            <Row className="mt-2 content-wrapper">
            <Col xs={12} sm={4} md={3} className="content-left">
                <div className="d-flex justify-content-center">
                    <span>{moment(props.std).format('HH : mm')}</span>
                </div>
                <div className="d-flex justify-content-center">
                    <span>{props.departureAirport}</span>
                </div>
            </Col>
            <Col xs={12} sm={4} md={6} className="content-center">
                <div  className="d-flex justify-content-center">
                    <span className="text-time">{props.duration.hours} Jam {props.duration.minutes} Menit</span>
                </div>
                <div  className="d-flex justify-content-center">
                    <span className="text-time">-------------------------</span>
                </div>
                <div  className="d-flex justify-content-center">
                    <span className="text-time">{ props.isRoundTrip ? "Round Trip" : "Langsung"}</span>
                </div>
            </Col>
            <Col xs={12} sm={4} md={3} className="content-right">
                <div className="d-flex justify-content-center">
                    <span>{moment(props.sta).format('HH : mm')}</span>
                </div>
                <div className="d-flex justify-content-center">
                    <span>{props.arrivalAirport}</span>
                </div>
            </Col>
        </Row>
    </Card>
  )
}

export default CardList
