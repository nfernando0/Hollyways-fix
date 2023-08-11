import React, { useContext, useEffect, useState } from 'react'
import Fund from '../assets/images/fund.png'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import '../assets/css/raiseFund.css'
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

    const [fundDonate, setFundDonate] = useState([])
    const [total, setTotal] = useState(0)

    const getFundDonate = async () => {
        try {
            const response = await API.get(`/donated/fund/${attacheId}`);
            // console.log(response.data.data)
            setFundDonate(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFundDonate()
    }, [])

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < fundDonate.length; i++) {
            total += fundDonate[i].donate_amount
        }
        setTotal(total)
    }, [fundDonate])




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

    // console.log("Tasdad", totalDonate)

    const donation = funds.donation

    const isTargetDonasi = total >= donation

    const persentaseTerkumpul = (total / donation) * 100

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <div className="raisefund">
                        <Col>
                            <img src={Fund} alt="" width={'100%'} />
                        </Col>
                        <Col>
                            <h1 className='f-bold mb-3'>{funds?.title}</h1>
                            <div>
                                <div className='d-flex justify-content-between m-0'>
                                    <p style={{ color: 'var(--bg)', fontWeight: 'bold' }}>
                                        <FormatRupiah value={total} />
                                    </p>
                                    <p>Gathered from</p>
                                    <p style={{ fontWeight: 'bold' }}>
                                        <FormatRupiah value={funds?.donation} />
                                    </p>
                                </div>
                                <ProgressBar variant="danger" now={persentaseTerkumpul} style={{ marginBottom: '1rem' }} />
                            </div>
                            <p>{funds?.description}</p>
                            {!isTargetDonasi ? (
                                <Button style={{ backgroundColor: 'var(--bg)', border: 'none', textDecoration: 'none', color: '#ffff', fontWeight: 'bold', width: '100%', padding: '0.2rem', borderRadius: '0.5rem' }} onClick={handleShow}>Donate</Button>
                            ) : (
                                <>
                                </>
                            )}
                        </Col>
                    </div>
                </Row>
            </Container>
            <Container className='w-full'>
                <h4 className='my-4'>List Donation</h4>
                {fundDonate?.map((fund) => (
                    <MyRaiseFundComponent funds={fund} />
                ))}
            </Container>
            <ModalDonate show={showModalDonate} onHide={handleClose} />
        </div>
    )
}

export default RaiseFund