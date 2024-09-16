import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import '../../../design/AddUser.css'
import axios from 'axios'

export default function AddUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [repeatPassword, setRepeatpassword] = useState('');

    const handleAddUser = async ()=> {
        try{
            if(!firstName || !lastName || !userName || !passWord || !repeatPassword){
                alert("Please Fill-Up the Form completely");
                return;
            }

            if(passWord.length < 5){
                alert("The password was too short! Please try again");
                return;
            }

            if(passWord !== repeatPassword){
                alert("The password was mismatch");
                return;
            }

            const response = await axios.post(import.meta.env.VITE_APP_SERVER_NEW_USER, {
                firstName,
                lastName, 
                userName, 
                passWord
            }, {
                headers: { 
                    "Content-Type": 'application/json'
                }
            })
            
            if(response.status === 201)
            {
                alert("New User was been added");
            }else{
                alert("Failed to add user: " + response.data.message); 
            }

        }catch(error){
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("An error occurred while adding the user: " + (error.response ? error.response.data.message : error.message));
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
            
                <Form.Label className='d-AddUser-Form-Label'>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password'
                    value={passWord}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setPassword(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Repeat Password</Form.Label>
                <Form.Control 
                    type='password' 
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