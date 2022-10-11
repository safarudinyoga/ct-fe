import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './style.scss';

const CardHeader = () => {
  return (
    <Row>
      <Col>
        <Card>
          <Col>
            <span>P</span>
            <span>Sel, 13 Sep 2022</span>
          </Col>
        </Card>
      </Col>
      <Col>
        <Card>
          <p>assa</p>
        </Card>
      </Col>
    </Row>

  )
}

export default CardHeader
