import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../assets/css/jumbotron.css'
import gambarSatu from '../assets/images/gambar-1.png'
import gambarDua from '../assets/images/gambar-2.png'

function JumbotronComponent() {
    return (
        <>
            <div className='body-bg'>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <div className='jumbo-left'>
                                <h1>While you are still standing, try to reach out to the people who are falling.</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <Button href='#donate' style={{ marginTop: '2rem', backgroundColor: '#ffff', color: 'var(--bg)', paddingLeft: '2rem', paddingRight: '2rem', borderRadius: '10px', fontWeight: 'bold', border: 'none' }}>Donate Now</Button>
                            </div>
                        </Col>
                        <Col>
                            <img src={gambarSatu} className='gambarSatu' alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='bottom'>
                <Container>
                    <Row>
                        <Col>
                            <img src={gambarDua} className='gambarDua' alt="" />
                        </Col>
                        <Col>
                            <div className='bottom-right'>
                                <h1>Your donation is very helpful for people affected by forest fires in Kalimantan.</h1>
                                <Row>
                                    <Col>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                    </Col>
                                    <Col>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </>
    )
}

export default JumbotronComponent