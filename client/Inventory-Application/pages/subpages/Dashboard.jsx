import { Container, Navbar, Nav } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import '../../design/Dashboard.css'

export default function Dashboard(){
    return(
        <>
            <Container className='d-Container'>
                <Container className='box d-Box-Container-1'> 
                    <Navbar className='d-Navbar-Container'>
                        <Nav className='d-Nav-Container'>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='add_item'>Add Item</Link>
                            </Nav.Item>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='show_item'>Show Item</Link>
                            </Nav.Item>
                            <Nav.Item className='d-Nav-Item'>
                                <Link className='d-Link-Item' to='update_item'>Update Item</Link>
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