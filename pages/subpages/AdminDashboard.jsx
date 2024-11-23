import { Container, Navbar, Nav } from "react-bootstrap"
import { Link, Outlet } from 'react-router-dom'
import '../../design/AdminDashboard.css' 

export default function AdminDashboard(){
    return(
        <>
            <Container className='ad-Container'>
                <Container className="box ad-Box-Container-1">
                    <Navbar className='ad-Navbar-Container'>
                        <Nav className='ad-Nav-Container'>
                            <Nav.Item className='ad-Nav-Item'>
                                <Link className='ad-Link-Item' to='add_user'>Add User</Link>
                            </Nav.Item>
                            <Nav.Item className='ad-Nav-Item'>
                                <Link className='ad-Link-Item' to='show_users'>Show Users</Link>
                            </Nav.Item>
                            <Nav.Item className='ad-Nav-Item'>
                                <Link className='ad-Link-Item' to='update_user'>Update User</Link>
                            </Nav.Item>
                            <Nav.Item className='ad-Nav-Item'>
                                <Link className='ad-Link-Item' to='delete_user'>Delete User</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>

                <Container className='box ad-Box-Container-2'>
                    <Outlet/>
                </Container>
            </Container>
        </>
    );
}