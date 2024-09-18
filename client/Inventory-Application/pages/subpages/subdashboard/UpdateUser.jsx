import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import '../../../design/UpdateUser.css'
import axios from 'axios'

export default function UpdateUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [repeatPassword, setRepeatpassword] = useState('');

    const handleUpdateUser = async (e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName || !userName || !passWord || !repeatPassword){
                alert("Please Fill-Up the Form");
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
    
            const response = await axios.put(import.meta.env.VITE_APP_SERVER_UPDATE_USER, {
                params: {firstName, lastName, userName, passWord},
                headers: {"Content-Type": 'application/json'}
            })
    
            if(response.status === 200){
                alert("The User's information was updated");
                setFirstname('');
                setLastname('');
                setPassword('');
                setRepeatpassword('');
            }else{
                alert("Failed to update the user's information: " + response.data.message);
            }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <>
            <Form className='d-UpdateUser-Form-Container'>
                <h1 className='d-UpdateUser-Form-Title'>Update User</h1>
                <Form.Label className='d-UpdateUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter username'
                    value={userName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setUsername(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password'
                    value={passWord}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setPassword(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Repeat Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter repeat password'
                    value={repeatPassword}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setRepeatpassword(e.target.value)}/><br/>

                <Container className='d-UpdateUser-Form-Button-Container'>
                    <Button 
                        className='d-UpdateUser-Form-Button'
                        onClick={handleUpdateUser}
                        >Update User</Button>
                </Container>
            </Form>
        </>
    );
}