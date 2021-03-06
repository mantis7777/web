import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import axios from 'axios';
import ListElement from './components/ListElement';
import History from './pages/History.js';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';

class App extends Component {
  state = {
    show: false,
    link: 'https://linube.com/blog/wp-content/uploads/error-404.jpg',
    suma: 0.1,
    paskirtis: '',
    shop: {},
    itemsList: [
      {
        id: 0,
        pavadinimas: 'Kebabas lavaše',
        kaina: 2.25,
        kiekis: '0'
      },
      {
        id: 1,
        pavadinimas: 'Kebabas lėkštėje',
        kaina: 1.85,
        kiekis: '0'
      },
      {
        id: 2,
        pavadinimas: 'Bulvinis kebabas',
        kaina: 3.69,
        kiekis: '0'
      },
      {
        id: 3,
        pavadinimas: 'Firminis kebabas',
        kaina: 5.49,
        kiekis: '0'
      },
      {
        id: 4,
        pavadinimas: 'Mėsainis',
        kaina: 4.42,
        kiekis: '0'
      },
      {
        id: 5,
        pavadinimas: 'Arbata',
        kaina: 1.42,
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
    this.setState({ suma: total }, this.generateQR);
  };

  handleClose = () => {
    let s = Object.assign({}, this.state.shop);
    s.shopBalance = this.state.shop.shopBalance +  this.state.suma;
    console.log(this.state.shop.shopBalance + this.state.suma); 
    this.setState({ show: false, shop: s});
  };

  handleShow = () => {
    if (this.state.suma !== 0.0) this.setState({ show: true });
  };

  generateQR = () => {
    QRCode.toDataURL(this.state.paskirtis + '~' + this.state.suma.toFixed(2) + '~LT012345678901234568')
      .then(url => {
        this.setState({ link: url }, this.handleShow);
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    axios
      .get('https://mokju-api.azurewebsites.net/api/shops/LT012345678901234568')
      .then(res => this.setState({ shop: res.data, paskirtis: res.data.name }));
  }

  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark" style={{ marginBottom: '2%' }}>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              {this.state.shop.name}
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/" style={{ textDecoration: 'none', color: '#96bdff' }}>
              Pagrindinis
            </Link>
            <div style={{ width: '10px' }} />
            <Link
              to="/israsas"
              style={{ textDecoration: 'none', color: '#96bdff' }}
            >
              Išrašas
            </Link>
          </Nav>
        </Navbar>
        <Route
          exact
          path="/"
          render={props => (
            <div>
              <Modal centered show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {this.state.paskirtis}: {this.state.suma.toFixed(2)} €
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
                  <Button variant="primary" onClick={this.handleClose}>
                    Atlikta
                  </Button>
                </Modal.Footer>
              </Modal>
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
                  <h1 style={{ ...tekstoSpalva, fontWeight: 'bold' }}>
                    {this.state.shop.shopBalance} €
                  </h1>
                    <input
                      tabIndex="1"
                      minLength="1"
                      maxLength="30"
                      type="text"
                      placeholder="Mokėjimo paskirtis (pvz: Už kebabą)"
                      onChange={e => {
                        var p =
                          e.target.value === ''
                            ? this.state.shop.name
                            : e.target.value;
                        this.setState({ paskirtis: p });
                      }}
                      style={{
                        height: '100%',
                        width: '40%',
                        marginBottom: '20px'
                      }}
                    />
                    <br />
                    <Button
                      tabIndex="2"
                      style={{ backgroundColor: 'green' }}
                      onClick={this.caclTotal}
                    >
                      Pateikti mokėjimą
                    </Button>
                    {this.state.suma === 0.0 ? (
                      <Alert
                        variant="danger"
                        style={{ marginTop: '30px', width: '50%' }}
                      >
                        Pasirinkite bent 1 produktą!
                      </Alert>
                    ) : ( <React.Fragment/>
                    )}
                </Container>
              </Jumbotron>
              <ListGroup
                style={{ margin: '2%', marginLeft: '10%', marginRight: '10%' }}
              >
                <ListElement
                  handleChange={this.handleChange}
                  itemsList={this.state.itemsList}
                />
              </ListGroup>
            </div>
          )}
        />
        <Route path="/israsas" component={History} />
      </Router>
    );
  }
}

const tekstoSpalva = {
  color: '#e3efee'
};

export default App;
