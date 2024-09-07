import { Container, Navbar, Nav } from "react-bootstrap"
import '../../design/Dashboard.css'
import axios from 'axios'

export default function Dashboard(){
    //TODO: Create a UI for Dashboard
    const HandleFindUser = async (e)=> {
        e.preventDefault();

        try{
            const response = await axios.get(import.meta.env.VITE_APP_FIND_USER, {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
            }, {
                headers : {
                    "Content-Type": 'application/json'
                }
            })

        }catch(error){
            console.error(error);
        }
    }

    const HandleNewUser = async (e)=> {
        e,preventDefault();

        try{

        }catch(error){
            console.error(error);
        }
    }

    const HandleUpdateUser = async (e)=> {
        e,preventDefault();

        try{
            const response = await axios.post({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord, 
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
        }catch(error){
            console.error(error);
        }
    }

    const HandleDeleteUser = async (e)=> {
        e,preventDefault();

        try{
            const response = await axios.delete({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord, 
            }, {
               headers: {
                    "Content-Type": 'application/json' 
               } 
            })
        }catch(error){
            console.error(error);
        }
    }

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
                    Main
                </Container>
            </Container>
        </>
    );
}