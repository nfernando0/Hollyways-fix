import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import DonationCard from '../components/DonationCard'
import '../assets/css/profile.css'
import Foto from '../assets/images/gambar-1.png'
import { useParams } from 'react-router-dom'
import { FormatRupiah } from '@arismun/format-rupiah'

const Profile = ({ profile }) => {

    const [state] = useContext(UserContext)

    let { data: donateByUser } = useQuery('donateByUser', async () => {
        const response = await API.get('/donated-user')
        // console.log(response.data.data)
        return response.data.data
    })

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col>
                        <div className="profile">
                            <h2 className='mb-3'>My Profile</h2>
                            <div className='d-flex gap-4'>
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

                        </div>
                    </Col>
                    <Col>
                        <h2 className='mb-3'>History Donation</h2>
                        <Container>
                            <Row>
                                <Col>
                                    {donateByUser?.map((donation, index) => (
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
                </Row>
            </Container>
        </div>
    )
}

export default Profile