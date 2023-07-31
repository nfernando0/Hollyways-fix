import React, { useState } from 'react'
import { Alert, Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/api'

const ModalRegister = ({ show, onHide }) => {

  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  })

  const { fullname, username, email, phone, password } = form

  const [message, setMessage] = useState('')

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/register", form)
      const alert = (
        <Alert variant="success" dismissible>
          Register Success
        </Alert>
      );
      setMessage(alert)

      setForm({
        fullname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
      })
    } catch (error) {
      const alert = (
        <Alert variant="danger" dismissible>
          Register Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error)
    }
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <Modal show={show} onHide={onHide} size="md">
        <Modal.Body>
          {message && message}
          <Container>
            <Row className='justify-content-center'>
              <Col lg={11}>
                <h1 className='my-4 fw-bold'>Register</h1>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="fullname"
                      label="Fullname"
                      className="mb-3"
                    >
                      <Form.Control type="text" onChange={handleChange} name='fullname' value={fullname} placeholder="Fullname" />
                    </FloatingLabel>
                  </div>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="username"
                      label="Username"
                      className="mb-3"
                    >
                      <Form.Control type="text" onChange={handleChange} name='username' value={username} placeholder="Username" />
                    </FloatingLabel>
                  </div>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="phone"
                      label="Phone Number"
                      className="mb-3"
                    >
                      <Form.Control type="number" onChange={handleChange} name='phone' value={phone} placeholder="Username" />
                    </FloatingLabel>
                  </div>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="email"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control type="email" onChange={handleChange} name='email' value={email} placeholder="Email" />
                    </FloatingLabel>
                  </div>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="password"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control type="password" onChange={handleChange} name='password' value={password} placeholder="Password" />
                    </FloatingLabel>
                  </div>
                  <Button style={{ backgroundColor: 'var(--bg)', border: 'none', width: '100%', padding: '1rem', fontWeight: 'bold', borderRadius: '10px', marginTop: '2rem' }} type='submit'>Register</Button>
                </Form >
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>Already have an account? Click Here</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body >
      </Modal >
    </div>
  )
}

export default ModalRegister