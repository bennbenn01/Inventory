import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import MessageBox from "../../../../customed_messagebox/MessageBox.jsx"
import axios from 'axios'  
import '../../../../design/ShowUsers.css'

export default function ShowUsersForm(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const handleFindUser = async (e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName){
                setMessageContent("No firstname or lastname was inputted");
                setShowMessage(true);
                return;
            }

            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USER, {
                params: {firstName, lastName},
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            
            const users = Array.isArray(response.data) ? response.data : [response.data];
            localStorage.setItem('users', JSON.stringify(users)); 
            navigate('/admin_dashboard/show_users/show_users_table');
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while getting information of the user: " + 
            (error.response ? error.response.data.message : error.message));
            setShowMessage(true);
        }
    }

    const handleFindUsers = async (e)=> {
        e.preventDefault();

        if(!token){
            console.log('Token is not defined');
            return;
        }

        try{
            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USERS, {
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

            setFirstname('');
            setLastname('');
            if(location.pathname.startsWith('/admin_dashboard')){
                const users = Array.isArray(response.data) ? response.data : [];
                localStorage.setItem('users', JSON.stringify(users));
                navigate('/admin_dashboard/show_users/show_users_table');
            }else{
                const users = Array.isArray(response.data) ? response.data : [];
                localStorage.setItem('users', JSON.stringify(users));
                navigate('/show_users/show_users_table');   
            }            
        }catch(error){
            if(error.response = []){
                setMessageContent("No Users Found");
                setShowMessage(true);
            }
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    return(
        <>
            <Form className='ad-ShowUser-Form-Container'>
                <h1 className='ad-ShowUser-Form-Title'>Show Users</h1>
                <Form.Label className='ad-ShowUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='ad-ShowUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='ad-ShowUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='ad-ShowUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>
            
                <Container className='ad-ShowUser-Form-Button-Container'>
                    <Button 
                        className='ad-ShowUser-Form-Button-1'
                        onClick={handleFindUser}
                        >Show User</Button>

                    <Button 
                        className='ad-ShowUser-Form-Button-2'
                        onClick={handleFindUsers}
                        >Show All Users</Button>
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