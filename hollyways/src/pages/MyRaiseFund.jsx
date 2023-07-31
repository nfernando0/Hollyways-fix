import React, { useContext, useState } from 'react'
import MyRaiseFundComponent from '../components/MyRaiseFundComponent'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CardRaiseFund from '../components/CardRaiseFund'
import { UserContext } from '../context/UserContext'

const MyRaiseFund = () => {

    let { data: fund } = useQuery('fundsss', async () => {
        const response = await API.get('/fund-user')
        // console.log(response.data.data)
        return response.data.data
    })


    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between'>
                            <h2>My Raise Fund</h2>
                            <Link to={'/makeRaiseFund'} style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', fontWeight: 'bold', padding: '1rem', borderRadius: '0.5rem' }}>Make Raise Fund</Link>
                        </div>
                        <div className='mt-3'>
                            <Container>
                                <Row>
                                    {fund?.map((f, index) => (
                                        <Col key={index}>
                                            <CardRaiseFund fund={f} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyRaiseFund