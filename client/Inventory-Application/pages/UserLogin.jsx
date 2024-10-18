import { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../reusing_Context/UserContext.jsx'
import '../design/UserLogin.css'
import axios from 'axios'

export default function UserLogin({ setIsAuthenticated }){
    const{userName, setUsername} = useUser();
    const[passWord, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try{
            if(!userName || !passWord){
                alert("No username or password was inputted");
                return;
            }

            if(!userName || !userName.passWord === passWord){
                alert("The username or password was incorrect! Please try again!");
                return;
            }

            if(!userName || !userName.passWord === passWord){
                setShowModal1(true);
                return;
            }

            const response = await axios.post(import.meta.env.VITE_APP_SERVER_LOGIN,{
               userName: userName,
               passWord: passWord,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if(response.status === 200){
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userName', response.data.userName);
                localStorage.setItem('token', response.data.token);
                setUsername(response.data.userName);     
                navigate('/dashboard');
            }
        }catch(error){
            if(error.response){
                alert("Login failed. Please try again!");
                setShowModal2(true);
                return;
            }else{
                alert(`Error: ${error.response.data.message || 'Login failed'}`);
                return;
            }
        }
    }

    return(
        <>
            <Container className='ul-Container'>
                <Form onSubmit={handleSubmit}>
                    <Container className='ul-Box-Container'>
                        
                        <Container className='ul-Container-Title'>
                            <h1 className='ul-Title'>INVENTORY</h1>
                        </Container>

                        <hr/>

                        <Form.Group>
                            <Form.Label className='ul-Label'>Username</Form.Label><br/>
                            <Form.Control 
                                type='text'
                                className='ul-Control' 
                                value={userName}
                                placeholder='Enter username'
                                onChange={(e)=>{setUsername(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='ul-Label'>Password</Form.Label><br/>
                            <Form.Control 
                                type='password'
                                className='ul-Control'
                                value={passWord} 
                                placeholder='Enter password'
                                onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Form.Group><br/>

                        <Container className='ul-Button-Container'>
                            <Button className='ul-Button' type='sumbit'>Log-in</Button>    
                        </Container>
                    </Container>
                </Form>
            </Container>
        </>
    );
}