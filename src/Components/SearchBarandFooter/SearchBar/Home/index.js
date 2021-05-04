import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import Carousel from 'react-bootstrap/Carousel'
import foto5 from "./foto5.jpg"
import foto6 from "./foto6.jpg"
import foto7 from "./foto7.jpg"


export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Container style={{ marginTop: '2em' , marginBottom : '2em' }}>
                     <Carousel>
                        <Carousel.Item >
                            <img
                            className="d-block w-100"
                            src={foto5}
                            alt="First slide"
                            width="500px"
                            height="500px"
                            />
                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                            className="d-block w-100"
                            src={foto6}
                            alt="First slide"
                            width="500px"
                            height="500px"
                            />
                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                            className="d-block w-100"
                            src={foto7}
                            alt="First slide"
                            width="500px"
                            height="500px"
                            />
                        </Carousel.Item>
                    </Carousel> 
                </Container>
            </div>
        )
    }
}

