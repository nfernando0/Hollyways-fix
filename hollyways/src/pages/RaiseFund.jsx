import React, { useContext, useEffect, useState } from 'react'
import Fund from '../assets/images/fund.png'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'
import { FormatRupiah } from '@arismun/format-rupiah'
import ModalLogin from '../components/modals/ModalLogin'
import ModalDonate from '../components/modals/ModalDonate'
import DonationCard from '../components/DonationCard'
import MyRaiseFundComponent from '../components/MyRaiseFundComponent'
import { UserContext } from '../context/UserContext'

const RaiseFund = () => {

    const params = useParams();
    let attacheId = parseInt(params.id)

    const [funds, setFunds] = useState([])

    useQuery('attacheCache', async () => {
        const response = await API.get('/fund/' + attacheId);
        setFunds(response.data.data)
    });

    const [showModalDonate, setShowModalDonate] = useState(false);
    const handleShow = () => setShowModalDonate(true);
    const handleClose = () => setShowModalDonate(false);

    let { data: fundDonation } = useQuery('fundDonation', async () => {
        const response = await API.get(`/fund-donated/${attacheId}`);
        // console.log(response.data.data)
        return response.data.data[0].donated
    })

    // console.log(fundDonation)
    const totalDonasi = fundDonation?.funds?.donate_amount



    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const totalBayar = fundDonation?.funds?.donate_amount.reduce(function (result, item) {
        return result + item.totalDonasi;
    }, 0);

    console.log(totalBayar)

    // console.log("Tasdad", totalDonate)

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col>
                        <img src={Fund} alt="" width={'100%'} />
                    </Col>
                    <Col>
                        <h1>{funds?.title}</h1>
                        <div>
                            <div className='d-flex justify-content-between m-0'>
                                <p>{totalBayar}</p>
                                <p>Gathered from</p>
                                <p>
                                    <FormatRupiah value={funds?.donation} />
                                </p>
                            </div>
                            <ProgressBar now={funds?.progress} variant="danger" style={{ marginBottom: '1rem' }} />
                        </div>
                        <p>{funds?.description}</p>
                        <Button style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', fontWeight: 'bold', width: '100%', padding: '0.2rem', borderRadius: '0.5rem' }} onClick={handleShow}>Donate</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Row style={{ display: 'block' }} className='gap-2'>
                    {fundDonation?.map((fund) => (
                        <Col lg={4} key={fund.id}>
                            <MyRaiseFundComponent funds={fund} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <ModalDonate show={showModalDonate} onHide={handleClose} />
        </div>
    )
}

export default RaiseFund