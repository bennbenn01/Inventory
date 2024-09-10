import { Container, Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import '../../design/Dashboard.css'
import axios from 'axios'   

export default function Dashboard(){
    //TODO: Create a UI for Dashboard

    return(
        <>
            <Container className='d-Container'>
                <Container className="box d-Box-Container-1">
                    <Navbar className='d-Navbar-Container'>
                        <Navbar.Brand className='d-Navbar-Brand'>Username</Navbar.Brand>
                        <Nav className='d-Nav-Container'>
                            <Nav.Item className='d-Nav-Item'>Add User</Nav.Item>
                            <Nav.Item className='d-Nav-Item'>Show Users</Nav.Item>
                            <Nav.Item className='d-Nav-Item'>Update User</Nav.Item>
                            <Nav.Item className='d-Nav-Item'>Delete User</Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>

                <Container className='box d-Box-Container-2'>
                    <Form className='d-Form-Container'>
                        <Form.Label className='d-Form-Label'>First Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter first name'
                            className='d-Form-Control'/><br/>

                        <Form.Label className='d-Form-Label'>Last Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter last name'
                            className='d-Form-Control'/><br/>

                        <Button 
                            className='d-Form-Button'
                            >Show Users</Button>
                    </Form>

                    <Container className='d-Table-Container'>
                        <Table striped bordered className='d-Table-Main-Container'>
                            <thead className='d-THead-Container'>
                                <tr>
                                    <th></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>User Name</th>
                                </tr>
                            </thead>
                            <tbody className='d-TBody-Container'>
                                <tr className=''>
                                    <td>1</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </Container>
        </>
    );
}