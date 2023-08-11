import React, { useContext, useEffect, useState } from 'react'
import MyRaiseFundComponent from '../components/MyRaiseFundComponent'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CardRaiseFund from '../components/CardRaiseFund'
import { UserContext } from '../context/UserContext'

const MyRaiseFund = () => {

    const [state] = useContext(UserContext)

    const [fund, setFunds] = useState([])

    const getFunds = async () => {
        try {
            const response = await API.get(`/fund/user/${state.user.id}`)
            setFunds(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFunds()
    }, [])

    console.log(fund)


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
                                    {fund?.map((f) => (
                                        <Col key={f.id}>
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