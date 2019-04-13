import React, { Component } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

export default class History extends Component {
  state = {
    hist: []
  };

  componentDidMount() {
    axios
      .get(
        'https://mokju-api.azurewebsites.net/api/payments/shop/LT012345678901234568'
      )
      .then(res => this.setState({ hist: res.data }));
  }

  render() {
    return this.state.hist.map(item => (
      <ListGroup.Item key={item.id} style={{marginLeft: '2%', marginRight: '2%'}}>
        <Row>
          <Col sm={11} style={{ fontWeight: 'bold' }}>
            {item.productName}
          </Col>
          <Col sm={0}>
            <Badge variant="primary">+{item.bill} €</Badge>
          </Col>
          <Col sm={8} style={{ fontSize: '10pt' }}>
            {item.senderAccount}
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  }
}
