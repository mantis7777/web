import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ListElement extends Component {
  state = {
    kiekis: '0'
  };

  change = (e, item) => {
    e.preventDefault();
    this.props.handleChange.bind(this, item.id, e.target.value);
}

  render() {
    return this.props.itemsList.map(item => (
      <ListGroup.Item key={item.id}>
        <Row>
          <Col style={{ fontSize: '15pt', paddingBottom: '10px' }} sm={2}>
            {item.pavadinimas}
          </Col>
          <Col style={{ paddingBottom: '10px' }} sm={8}>
            <Badge
              style={{
                ...centerText,
                ...{ marginLeft: '120px', fontSize: '15pt', width: '100px' }
              }}
              variant="primary"
            >
              {item.kaina + ' €'}
            </Badge>
          </Col>
          <Col style={{ paddingBottom: '10px' }} sm={2}>
            <input
              onChange={(e) => {this.props.handleChange(this, item.id, e.target.value);}}
              min="0"
              max="15"
              type="number"
              value={item.kiekis}
              style={{ marginLeft: '40px', height: '100%', width: '45px' }}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  }
}

const centerText = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};
