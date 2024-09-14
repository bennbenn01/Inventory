import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useUser } from '../../reusing_Context/UserContext.jsx'
import axios from 'axios'
import '../../design/Header.css'

export default function Header(){
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const{ userName } = useUser();  

    const toggleDropdown = ()=> {
        setShowDropdown(prev => !prev)
    }

    const handleLogOut = async (e)=> {
        e?.preventDefault();
        try{
            const response = await axios.post(import.meta.env.VITE_APP_SERVER_LOGOUT, {
                userName: userName,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if(response.status === 200){
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
            }
        }catch(error){
            console.error(error);
        }
    }

    const handleClickOutside = (event)=> {
        if(event.target.closest('.header-Dropdown-Container') === null){
            setShowDropdown(false);
        }
    }

    useEffect(()=> {
        document.addEventListener('mousedown', handleClickOutside);
        return ()=> {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return(
        <Container className='header-Navbar-Container'>
            <Navbar className='header-Navbar-Box-Container'>
                <Navbar.Brand className='navbar-Title'>
                    Inventory
                </Navbar.Brand>
                <Nav>
                    <Dropdown className='header-Dropdown-Container'>
                        <Dropdown.Toggle className='header-Dropdown-Toggle'>
                            <Container 
                                className='header-Sphere-Dropdown'
                                onClick={toggleDropdown}/>
                        </Dropdown.Toggle>

                        {showDropdown && (
                            <Dropdown.Menu className='header-Dropdown-Menu'>
                                <Dropdown.Item className='header-Dropdown-Menu-Item'>Settings</Dropdown.Item>
                                <Dropdown.Item 
                                    className='header-Dropdown-Menu-Item'
                                    onClick={()=> {
                                        setShowDropdown(false);
                                        handleLogOut();
                                    }}>Log-out</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>   
                </Nav>
            </Navbar>
        </Container>
    );
}