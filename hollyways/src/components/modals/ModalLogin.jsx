import React, { useContext, useState } from 'react'
import '../../assets/css/navbar.css'
import { Alert, Button, Col, Container, FloatingLabel, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { API, setAuthToken } from '../../config/api'

const ModalLogin = ({ show, onHide }) => {

  const [, dispatch] = useContext(UserContext)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  // Login
  const [showLogin, setShowLogin] = useState(true)
  const handleCloseLogin = () => showLogin(false)

  // Register
  const [showRegister, setShowRegister] = useState(true)
  const handleCloseRegister = () => {
    setShowRegister(false)
    setShowLogin(true)
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { email, password } = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/login", form)
      console.log("Login", response)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })

      setAuthToken(localStorage.token)
      setForm({
        email: '',
        password: '',
      })

      const alert = (
        <Alert variant="success" dismissible>
          Login Success
        </Alert>
      )

      setMessage(alert)
    } catch (err) {
      const alert = (
        <Alert variant="danger" dismissible>
          Login Failed
        </Alert>
      )
      setMessage(alert)
    }
  })


  return (
    <div>
      <Modal show={show} onHide={onHide} size="md">
        <Modal.Body>
          {message && message}
          <Container>
            <Row className='justify-content-center'>
              <Col lg={11}>
                <h1 className='my-4 fw-bold'>LOGIN</h1>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="email"
                      label="Email"



                      className="mb-3"
                    >
                      <Form.Control type="email" value={email} onChange={handleChange} name="email" placeholder="Email" />
                    </FloatingLabel>
                  </div>
                  <div class="form-floating mb-3">
                    <FloatingLabel
                      controlId="password"

                      label="Password"

                      className="mb-3"
                    >
                      <Form.Control type="password" onChange={handleChange} name="password"
                        value={password} placeholder="Password" />
                    </FloatingLabel>
                  </div>
                  <Button style={{ backgroundColor: 'var(--bg)', border: 'none', width: '100%', padding: '1rem', fontWeight: 'bold', borderRadius: '10px', marginTop: '2rem' }} type='submit'>Login</Button>
                </Form >
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>Don't have an account? Click Here</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body >
      </Modal >
    </div >
  )
}

export default ModalLogin