import { useState } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'
import '../../../design/Dashboard.css'
import axios from 'axios'  

export default function ShowUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [users, setUsers] = useState([]);

    const handleFindUser = async ()=> {
        try{
            if(!firstName || !lastName){
                alert("No firstname or lastname was inputted");
                return;
            }

            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USER, {
                params: {firstName, lastName},
                headers: {"Content-Type": 'Application/json'}
            })
        
            setUsers([response.data]);
        }catch(error){
            console.error(error);
        }
    }

    const handleFindUsers = async ()=> {
        const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USERS, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        setUsers(response.data);
    }

    return(
        <>
            <Form className='d-Form-Container'>
                <Form.Label className='d-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>
            
                <Container className='d-Form-Button-Container'>
                    <Button 
                        className='d-Form-Button-1'
                        onClick={handleFindUser}
                        >Show User</Button>

                    <Button 
                        className='d-Form-Button-2'
                        onClick={handleFindUsers}
                        >Show All Users</Button>
                </Container>
            </Form>

            <Container className='d-Table-Container'>
                <Table striped bordered className='d-Table-Main-Container'>
                    <thead className='d-THead-Container'>
                        <tr>
                            <th className='d-TH-Row'>ID</th>
                            <th className='d-TH-Row'>First Name</th>
                            <th className='d-TH-Row'>Last Name</th>
                            <th className='d-TH-Row'>User Name</th>
                        </tr>
                    </thead>
                    <tbody className='d-TBody-Container'>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={4} className='d-TD-Colspan'>No Users Found</td>
                        </tr>
                    ) : (
                        users.map((user, i)=> (
                        <tr key={i}>
                            <td className='d-TD-Row'>{user._id || 'N/A'}</td>
                            <td className='d-TD-Row'>{user.firstName || 'N/A'}</td>
                            <td className='d-TD-Row'>{user.lastName || 'N/A'}</td>
                            <td className='d-TD-Row'>{user.userName || 'N/A'}</td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}