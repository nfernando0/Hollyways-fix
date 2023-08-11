import React, { useContext, useState } from 'react'
import '../assets/css/navbar.css'
import LogoNavbar from '../assets/images/logo.png'
import { Button, Container, Dropdown, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import ModalLogin from './modals/ModalLogin';
import ModalRegister from './modals/ModalRegister';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import profileLogo from '../assets/images/profile-logo.png';
import RaiseFund from '../assets/images/raisefund.png';
import LogoutIcon from '../assets/images/logout.png';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import User from '../assets/images/User.png'
function NavbarComponent() {



    const [state, dispatch] = useContext(UserContext)
    // Start Modal Login
    const [showModalLogin, setShowModalLogin] = useState(false);
    const handleShow = () => setShowModalLogin(true);
    const handleClose = () => setShowModalLogin(false);
    // End Modal Login

    // Start Register Modal
    const [showModalRegister, setShowModalRegister] = useState(false)
    const handleShowRegister = () => setShowModalRegister(true);
    const handleCloseRegister = () => setShowModalRegister(false);
    // End Modal Login

    const handleClick = (e) => {
        e.preventDefault()
    }

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <div>
            <Navbar expand="lg" className="navbar-bg" data-bs-theme="white">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={LogoNavbar} alt="" />
                    </Navbar.Brand>
                    {state.isLogin ? (
                        <Dropdown>
                            <Dropdown.Toggle variant='transparent' className='gap-2 d-flex align-items-center' style={{ border: "none" }} id="dropdown-menu-align-end">
                                {/* <h4 style={{ color: '#ffffff' }}>{state.user.username}</h4> */}
                                <img src={User} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className='d-flex align-items-center' style={{ padding: '0.5rem' }}>
                                    <Link to={`/profile/${state.user.id}`} profile={state.user.id} className='text-decoration-none w-100' >
                                        <img src={profileLogo} alt="profile logo" width={30} />
                                        <span style={{ color: '#000', marginLeft: '0.5rem' }}>Profile</span>
                                    </Link>
                                </div>

                                <div className='d-flex align-items-center' style={{ padding: '0.5rem' }}>
                                    <Link to={`/myRaiseFund/${state.user.id}`} className='text-decoration-none'>
                                        <img src={RaiseFund} alt="raise fund icon" width={30} />
                                        <span style={{ color: '#000', marginLeft: '0.5rem' }}>Raise Fund</span>
                                    </Link>
                                </div>
                                <Dropdown.Divider />
                                <div className='d-flex align-items-center' style={{ padding: '0.5rem' }}>
                                    <Link to={"/"} onClick={handleLogout} style={{ textDecoration: 'none' }}>
                                        <img src={LogoutIcon} alt="logout icon" width={30} />
                                        <span style={{ color: '#000', marginLeft: '0.5rem' }}>Logout</span>
                                    </Link>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Button className='login-btn' style={{ border: 'none' }} onClick={handleShow}>Login</Button>
                                    <Button className='register-btn' style={{ border: 'none' }} onClick={handleShowRegister}>Register</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    )}
                </Container>
            </Navbar>
            <ModalLogin show={showModalLogin} onHide={handleClose} />
            <ModalRegister show={showModalRegister} onHide={handleCloseRegister} />
        </div>
    )
}

export default NavbarComponent