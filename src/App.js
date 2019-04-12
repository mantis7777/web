import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import QRCode from 'qrcode';
import './App.css';
import ListElement from './ListElement';

class App extends Component {
  state = {
    show: false,
    link: 'https://linube.com/blog/wp-content/uploads/error-404.jpg',
    suma: 0.0,
    paskirtis: 'Kebabine',
    itemsList: [
      {
        id: 0,
        pavadinimas: 'Kebabas',
        kaina: 3.25,
        kiekis: '0'
      },
      {
        id: 1,
        pavadinimas: 'Pica',
        kaina: 5.49,
        kiekis: '0'
      }
    ]
  };

  handleChange = (context, id, value) => {
    this.setState({
      itemsList: this.state.itemsList.map(item => {
        if (item.id === id) {
          item.kiekis = value;
        }
        return item;
      })
    });
  };

  caclTotal = () => {
    var total = 0.0;
    this.state.itemsList.forEach(item => {
      total += item.kaina * parseFloat(item.kiekis);
    });
    this.setState({ suma: total });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  generateQR = () => {
    QRCode.toDataURL((this.state.suma.toFixed(2).toString() + '~' + this.state.paskirtis)
      .then(url => {
        this.setState({ link: url });
      })
      .catch(err => {
        console.error(err);
      });

    this.caclTotal();
    this.setState({ show: true });
  };

  setTitle = () => {};

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.paskirtis}: {this.state.suma} €
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              src={this.state.link}
              style={{
                display: 'flex',
                margin: 'auto',
                width: '200px',
                height: '200px'
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Atšaukti
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Atlikti mokėjimą
            </Button>
          </Modal.Footer>
        </Modal>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Kebabinė</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Pagrindinis</Nav.Link>
            <Nav.Link href="#features">Savybės</Nav.Link>
            <Nav.Link href="#pricing">Kainoraštis</Nav.Link>
          </Nav>
        </Navbar>

        <Jumbotron
          fluid
          style={{
            marginLeft: '10%',
            marginTop: '3%',
            marginRight: '10%',
            marginBottom: '3%',
            backgroundColor: '#5d0784'
          }}
        >
          <Container>
            <p style={tekstoSpalva}>Sąskaita:</p>
            <h1 style={{ ...tekstoSpalva, fontWeight: 'bold' }}>23,59 €</h1>
            <p>
              <input
                minLength="1"
                maxLength="30"
                type="text"
                placeholder="Mokėjimo paskirtis"
                onChange={e => {
                  var p = e.target.value === '' ? 'Kebabinė' : e.target.value;
                  this.setState({ paskirtis: p });
                }}
                style={{ height: '100%', width: '40%', marginBottom: '20px' }}
              />
              <br />
              <Button
                style={{ backgroundColor: 'green' }}
                onClick={this.generateQR}
              >
                Pateikti mokėjimą
              </Button>
            </p>
          </Container>
        </Jumbotron>
        <div style={{ marginBottom: '100px' }}>
          <ListGroup style={{ margin: '10%', marginRight: '40%' }}>
            <ListElement
              handleChange={this.handleChange}
              itemsList={this.state.itemsList}
            />
          </ListGroup>
        </div>
      </div>
    );
  }
}

const tekstoSpalva = {
  color: '#e3efee'
};

export default App;
