import React from 'react'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FormatRupiah } from "@arismun/format-rupiah";
import Fund from '../assets/images/fund.png'

const MyRaiseFundComponent = ({ fund }) => {

    // console.log(fund?.fundraising?.title)
    return (
        <div className='m-3'>
            <Col>
                <Card>
                    <Card.Body style={{ padding: '0' }}>
                        <Card.Img variant="top" src={Fund} style={{ padding: '0', margin: '0' }} />
                        <div style={{ padding: '1rem' }}>
                            <h4 className='fw-bold'>{fund?.title}</h4>
                            <p style={{ Color: '#ddd', marginTop: '0.5rem', marginBottom: '1rem' }}>{fund?.description}</p>
                            <ProgressBar now={fund?.progress} variant="danger" style={{ marginBottom: '1rem' }} />
                            <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ marginTop: '0.1rem', fontWeight: 'bold' }}>
                                    <FormatRupiah value={fund?.donation} >
                                        {/* <p>{fund?.goals}</p> */}
                                    </FormatRupiah>
                                </div>
                                <Link to={`/raiseFund/${fund?.id}`} style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.3rem', paddingBottom: '0.3rem', borderRadius: '0.5rem' }} >Donate Now</Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default MyRaiseFundComponent