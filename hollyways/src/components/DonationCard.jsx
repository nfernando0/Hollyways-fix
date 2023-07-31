import { FormatRupiah } from '@arismun/format-rupiah'
import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { API } from '../config/api';

const DonationCard = () => {


    // const [donations, setDonations] = useState([]);

    const paras = useParams();
    let donationId = parseInt(paras.id)

    let { data: donations } = useQuery('donationID', async () => {
        const response = await API.get("/donated/" + donationId);
        // console.log(response.data.data)
        return response.data.data
    })


    return (
        <div>
            
        </div>
    )
}

export default DonationCard