import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import '../../../design/AddUser.css'
import axios from 'axios'

export default function AddUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userName, setUsername] = useState('');
    const [currentPassword, setCurrentpassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [repeatPassword, setRepeatpassword] = useState('');

    const handleAddUser = async ()=> {
        try{
            if(!firstName || !lastName || !userName || !currentPassword || !newPassword || !repeatPassword)
            {
                alert("Please Fill-Up the Form completely");
                return;
            }

            const response = await axios.post(import.meta.env.VITE_APP_SERVER_NEW_USERS, {
                params: {firstName, lastName, userName, currentPassword, newPassword, repeatPassword},
                headers : { "Content-Type": 'application/json'}
            })
            

        }catch(error){
            console.error(error);
        }
        
    }

    return(
        <>
            <Form className='d-AddUser-Form-Container'>
                <Form.Label className='d-AddUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter username'
                    value={userName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setUsername(e.target.value)}/><br/>
            
                <Form.Label className='d-AddUser-Form-Label'>Current Password</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter current password'
                    value={currentPassword}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setCurrentpassword(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>New Password</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter new password'
                    value={newPassword}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setNewpassword(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Repeat Password</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter repeat password'
                    value={repeatPassword}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setRepeatpassword(e.target.value)}/><br/>

                <Container className='d-AddUser-Form-Button-Container'>
                    <Button 
                        className='d-AddUser-Form-Button'
                        onClick={handleAddUser}
                        >Add User</Button>
                </Container>
            </Form>
        </>
    );
}