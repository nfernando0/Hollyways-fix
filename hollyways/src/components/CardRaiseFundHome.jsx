import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FormatRupiah } from "@arismun/format-rupiah";
import Fund from '../assets/images/fund.png'
import { UserContext } from '../context/UserContext';
import ModalLogin from './modals/ModalLogin';
import { useQuery } from 'react-query';
import { API } from '../config/api';

const MyRaiseFundComponent = ({ fund }) => {

    const [state, dispatch] = useContext(UserContext)

    // console.log(fund.donateds)

    const getFundDonate = async () => {
        try {
            const response = await API.get(`/donateds`)
            setIsDonated(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // let { data: isDonated } = useQuery('isDonated', async () => {
    //     const response = await API.get(`/funds`)
    //     return response.data.data
    // })

    // console.log(isDonated)

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => {
        handleCloseRegister(false);
        setShowLogin(true);
    }

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => {
        handleCloseLogin(false);
        setShowRegister(true);
    }


    return (
        <div className='m-3'>
            <Col>
                <Card>
                    <Card.Body style={{ padding: '0' }}>
                        <Card.Img variant="top" src={Fund} style={{ padding: '0', margin: '0' }} />
                        <div style={{ padding: '1rem' }}>
                            <h4 className='fw-bold'>{fund.title}</h4>
                            <p style={{ Color: '#ddd', marginTop: '0.5rem', marginBottom: '1rem' }}>{fund?.description}</p>
                            <ProgressBar now={fund?.progress} variant="danger" style={{ marginBottom: '1rem' }} />
                            <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ marginTop: '0.1rem', fontWeight: 'bold' }}>

                                </div>
                                {state.isLogin ? (
                                    <Link to={`/raiseFund/${fund?.id}`} style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.3rem', paddingBottom: '0.3rem', borderRadius: '0.5rem' }} >Donate</Link>
                                ) : (
                                    <Button variant='primary' onClick={handleShowLogin} style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.3rem', paddingBottom: '0.3rem', borderRadius: '0.5rem' }}>Donate</Button>
                                )}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <ModalLogin show={showLogin} onHide={handleCloseLogin} />
        </div>
    )
}

export default MyRaiseFundComponent