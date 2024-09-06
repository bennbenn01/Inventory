import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useUser } from '../../reusing_Context/userContext'
import axios from 'axios'
import '../../design/Header.css'

export default function Header(){
    const navigate = useNavigate();
    const{ userName } = useUser();
    
    const handleLogOut = async (e)=> {
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