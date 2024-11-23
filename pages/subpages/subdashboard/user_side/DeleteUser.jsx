import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import MessageBox from "../../../../customed_messagebox/MessageBox"
import '../../../../design/DeleteUser.css'
import axios from 'axios'

export default function DeleteUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const token = localStorage.getItem('token');
    
    const handleDeleteUser = async(e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName){
                setMessageContent("No firstname or lastname was inputted");
                setShowMessage(true);
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
                setMessageContent("The User has been deleted successfully");
                setShowMessage(true);
                setFirstname('');
                setLastname('');
            }else{
                setMessageContent("Failed to delete a user: " + response.data.message);
                setShowMessage(true);
            }
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while deleting the user: " + error ? error.response.data.message : error.message);
            setShowMessage(true);
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    return(
        <>
            <Form className='ad-DeleteUser-Form-Container'>
                <h1 className='ad-DeleteUser-Form-Title'>Delete User</h1>
                <Form.Label className='ad-DeleteUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='ad-DeleteUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='ad-DeleteUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='ad-DeleteUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>
            
                <Container className='ad-DeleteUser-Form-Button-Container'>
                    <Button 
                        className='ad-DeleteUser-Form-Button'
                        onClick={handleDeleteUser}
                        >Delete User</Button>
                </Container>
            </Form>

            {showMessage && (
                <MessageBox
                    message={messageContent}
                    show={showMessage}
                    onClose={handleCloseMessage}
                />
            )}
        </>
    );
}