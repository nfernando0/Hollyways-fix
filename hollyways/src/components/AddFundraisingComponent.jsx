import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../config/api'
import '../assets/css/fund.css'
import { Navigate, useNavigate } from 'react-router-dom'

function AddFundraisingComponent() {

    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        title: '',
        image: '',
        donation: '',
        desc: '',
    })

    const { title, image, donation, description } = form

    const [message, setMessage] = useState('')

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData();
            formData.set('title', title)
            formData.set('image', image[0], image[0].title);
            formData.set('donation', donation)
            formData.set('description', description)

            const response = await API.post('/fund', formData, config)
            console.log("data", response)

            navigate('/')

        } catch (error) {
            const alert = (
                <Alert variant="danger" dismissible>
                    Register Failed
                </Alert>
            );
            setMessage(alert)
            console.log(error)
        }
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col>
                        <h1>Make Raise Fund</h1>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Control onChange={handleChange} value={title} type="text" name='title' placeholder="Title" />
                            </Form.Group>
                            <img src={preview} width={200} className='my-3' alt="" />
                            <Form.Group className="mb-3" controlId=" image">
                                <input type="file" id="formFile" name='image' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="donation">
                                <Form.Control type="text" name='donation' onChange={handleChange} value={donation} placeholder="Goals" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" name='description' value={description} onChange={handleChange} rows={3} placeholder='Description' />
                            </Form.Group>
                            <div style={{ display: 'flex', float: 'right', marginTop: '3rem' }}>
                                <Button style={{ backgroundColor: 'var(--bg)', border: 'none', padding: '0.5rem' }} type='submit'>Public Fundraising</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddFundraisingComponent