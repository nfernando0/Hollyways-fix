import React, { useEffect, useState } from 'react'
import JumbotronComponent from '../components/JumbotronComponent'
import CardRaiseFund from '../components/CardRaiseFund'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../config/api'

const Homepage = () => {

    // const [funds, setFunds] = useState([])
    let { data: funds } = useQuery('fundsss', async () => {
        const response = await API.get('/funds')
        // console.log(response.data.data)
        return response.data.data
    })

    return (
        <div>
            <JumbotronComponent />
            <div>
                <h1 id='donate' className='text-center' style={{ marginTop: '40rem', color: 'var(--bg' }}>Donate Now</h1>
                <Container>
                    <Row>
                        {funds?.map((f, index) => (
                            <Col lg={4} key={index}>
                                <CardRaiseFund fund={f} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Homepage