import { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link, Outlet } from 'react-router-dom'
import '../../design/AdminDashboard.css' 

export default function AdminDashboard(){
    const [userName, setUsername] = useState('');

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
        <>
            <Container className='d-Container'>
                <Container className="box d-Box-Container-1">
                    <Navbar className='d-Navbar-Container'>
                        <Navbar.Brand className='d-Navbar-Brand'>
                            Username: {userName}</Navbar.Brand>
                        <Nav className='d-Nav-Container'>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='add_user'>Add User</Link>
                            </Nav.Item>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='show_users'>Show Users</Link>
                            </Nav.Item>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='update_user'>Update User</Link>
                            </Nav.Item>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='delete_user'>Delete User</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>

                <Container className='box d-Box-Container-2'>
                    <Outlet/>
                </Container>
            </Container>
        </>
    );
}