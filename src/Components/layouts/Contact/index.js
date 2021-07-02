//import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container
} from 'semantic-ui-react'
import Card  from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Navbar from 'react-bootstrap/Navbar'

  



export default class Contact extends Component {
    handleClickFacebook = () => {
        window.open("https://www.facebook.com/abdelfattah.bouhlali.99");
    }
     handleClickInstagram = () => {
        window.open("https://www.instagram.com/abdelfattahbouhlali/?hl=fr");
    }
    render() {
        return (
            <div>
                <Container   style={{ marginTop: '4em' , marginBottom : '6em' }}>
                    <Navbar bg="dark">
                        <Navbar.Brand href="#" style={{color:"white"}}>CONTACTEZ-NOUS</Navbar.Brand>
                    </Navbar>
                    <CardDeck>
                        <Card border="primary" style={{ width: '20rem'  }} className="text-center">
                            <Card.Header>Telephone</Card.Header>
                            <Card.Body>
                                <Card.Title>0680483608</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card border="primary"  className="text-center">
                            <Card.Header>Email</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    ABDELFATTAH.BOUHLALI99@HOTMAIL.COM
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <CardDeck style={{ marginTop: '1em' }}>
                        <Card border="primary" style={{ width: '20rem' }} className="text-center">
                            <Card.Header><Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="btn btn-primary"
                                    startIcon={<FacebookIcon />}
                                    onClick={this.handleClickFacebook}
                                >
                                    Abdelfattah Bouhlali
                                </Button></Card.Header>
                        </Card>
                    </CardDeck>
                    <CardDeck style={{ marginTop: '1em' }}>
                        <Card border="primary" style={{ width: '20rem' }} className="text-center">
                            <Card.Header><Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className="btn btn-success"
                                    startIcon={<InstagramIcon />}
                                    onClick={this.handleClickInstagram}
                                >
                                    Abdelfattah Bouhlali
                                </Button></Card.Header>
                        </Card>
                    </CardDeck>
                </Container>
            </div>
        )
    }
}
