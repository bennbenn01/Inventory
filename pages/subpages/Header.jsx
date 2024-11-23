import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import '../../design/Header.css'

export default function Header(){
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUsername] = useState('');
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const toggleDropdown = ()=> {
        setShowDropdown(prev => !prev)
    }

    const handleClickTitle = (e)=> {
        e?.preventDefault();
        
        navigate(role === 'admin' ? '/admin_dashboard' :  '/dashboard');
    }

    const handleSettings = (e)=> {
        e?.preventDefault();
        navigate('settings');
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
                localStorage.removeItem('userName');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
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

    useEffect(()=> {
        async function fetchUser() {
            try{
                const storageUsername = localStorage.getItem('userName');
                if(storageUsername){
                    setUsername(storageUsername);
                }else{
                    console.error("No user was logged in");
                }
            }catch(error){
                console.error("Failed to fetch user: " + error);
            }
        }
        fetchUser();
    }, [])

    return(
        <Container className='header-Navbar-Container'>
            <Navbar className='header-Navbar-Box-Container'>
                <Navbar.Brand 
                    as={Link}
                    className='navbar-Title'
                    onClick={handleClickTitle}>
                    INVENTORY
                </Navbar.Brand>
                
                <div style={{ flexGrow: 1 }} />

                <span className='navbar-username'>{userName}</span>

                <Nav>
                    <Dropdown className='header-Dropdown-Container'>
                        <Dropdown.Toggle className='header-Dropdown-Toggle'>
                            <Container 
                                className='header-Sphere-Dropdown'
                                onClick={toggleDropdown}/>
                        </Dropdown.Toggle>

                        {showDropdown && (
                            <Dropdown.Menu className='header-Dropdown-Menu'>
                                <Dropdown.Item 
                                    as={Link}
                                    className='header-Dropdown-Menu-Item'
                                    to='settings'
                                    onClick={()=> {
                                        setShowDropdown(false);
                                        handleSettings();
                                    }}>Settings</Dropdown.Item>
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