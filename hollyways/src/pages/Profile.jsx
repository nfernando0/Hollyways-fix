import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import DonationCard from '../components/DonationCard'
import '../assets/css/profile.css'
import Foto from '../assets/images/gambar-1.png'
import { useParams } from 'react-router-dom'
import { FormatRupiah } from '@arismun/format-rupiah'

const Profile = (props) => {

    const [state] = useContext(UserContext)
    const [donate, setDonate] = useState([])

    const getDonate = async () => {
        try {
            const response = await API.get(`/donated/user/${state.user.id}`)
            setDonate(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDonate()
    }, [])

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <div className="profile">
                        <Col>
                            <h2 className='mb-3'>My Profile</h2>
                            <div className='myprofile'>

                                <img src={Foto} style={{ width: '250px', height: '250px', }} alt="" />
                                <div>
                                    <h5 style={{ color: 'var(--bg)' }}>Fullname</h5>
                                    <p>{state.user.fullname}</p>
                                    <h5 style={{ color: 'var(--bg)' }}>Email</h5>
                                    <p>{state.user?.email}</p>
                                    <h5 style={{ color: 'var(--bg)' }}>Phone</h5>
                                    <p>{state.user?.phone}</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <h2 className='mb-3 mt-4'>History Donation</h2>
                            <Container>
                                <Row>
                                    <Col>
                                        {donate?.map((donation, index) => (
                                            <Card key={index} className='mt-2'>
                                                <Card.Body>
                                                    <p>{donation?.fund?.title}</p>   {/* Title  */}
                                                    <p>Saturday, 12 April 2021</p>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <FormatRupiah value={donation?.donate_amount} />
                                                        <Button style={{ backgroundColor: 'rgba(0, 255, 47, 0.5)', border: 'none', color: '#000', fontWeight: 'bold', pointerEvents: 'none' }}>Finished</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Profile