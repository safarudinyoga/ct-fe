import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.scss';

interface Props {
  departure?: string
  departureCode?: string
  arrival?: string
  arrivalCode?: string
  timeDeparture?: string
  passenger?: number
  class?: string
}

const Header = (props: Props) => {
  return (
    <div className="header-list-flight">
        <Row>
            <Col xs={1} sm={1} md={1}/>
                <Col>
                    <span className="title text-warning">Penerbangan {props.departure} ({props.departureCode})- {props.arrival} ({props.arrivalCode})</span>
                    <div className="mt-2">
                    <i className={`text-4xl text-neutral-6000 purple las la-calendar mr-1 icon`}></i>
                    <span className="text-medium mr-4">{props.timeDeparture}</span>
                    <i className={`text-4xl text-neutral-6000 purple las la-user-friends mr-1 icon`}></i>
                    <span className="text-medium mr-4">{props.passenger} Penumpang</span>
                    <i className={`text-4xl text-neutral-6000 purple las la-passport mr-1 icon`}></i>
                    <span className="text-medium">{props.class}</span>
                    </div>
                </Col>
            <Col xs={1} sm={1} md={1}/>
        </Row>
    </div>
  )
}

export default Header
