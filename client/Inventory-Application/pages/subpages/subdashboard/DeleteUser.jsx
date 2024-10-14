import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import '../../../design/DeleteUser.css'
import axios from 'axios'

export default function DeleteUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const token = localStorage.getItem('token');
    
    const handleDeleteUser = async(e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName){
                alert("No firstname or lastname was inputted");
                return;
            }
    
            const response = await axios.delete(import.meta.env.VITE_APP_SERVER_DELETE_USER, {
                params: {firstName, lastName},
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
    
            if(response.status === 200){
                alert("The User has been deleted successfully");
                setFirstname('');
                setLastname('');
            }else{
                alert("Failed to delete a user: " + response.data.message);
            }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <>
            <Form className='d-DeleteUser-Form-Container'>
                <h1 className='d-DeleteUser-Form-Title'>Delete User</h1>
                <Form.Label className='d-DeleteUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-DeleteUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-DeleteUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-DeleteUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>
            
                <Container className='d-DeleteUser-Form-Button-Container'>
                    <Button 
                        className='d-DeleteUser-Form-Button'
                        onClick={handleDeleteUser}
                        >Delete User</Button>
                </Container>
            </Form>
        </>
    );
}