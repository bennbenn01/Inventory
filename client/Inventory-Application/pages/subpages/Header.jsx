import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import '../../design/Header.css'

export default function Header(){
    const navigate = useNavigate();

    const handleLogOut = (e)=> {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    }

    return(
        <Container className='header-Navbar-Container'>
            <Navbar className='header-Navbar-Box-Container'>
                <Navbar.Brand className='navbar-Title'>
                    Inventory
                </Navbar.Brand>
                <Nav>
                    <Dropdown className='header-Dropdown-Container'>
                        <Dropdown.Toggle className='header-Dropdown-Toggle'>
                            <Container className='header-Sphere-Dropdown'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='header-Dropdown-Menu'>
                            <Dropdown.Item className='header-Dropdown-Menu-Item'>Settings</Dropdown.Item>
                            <Dropdown.Item 
                                className='header-Dropdown-Menu-Item'
                                onClick={handleLogOut}>Log-out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>    
                </Nav>
            </Navbar>
        </Container>
    );
}