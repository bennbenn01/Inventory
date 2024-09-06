import { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../reusing_Context/userContext'
import '../design/UserLogin.css'
import axios from 'axios'

export default function UserLogin({ setIsAuthenticated }){
    const{userName, setUsername} = useUser();
    const[passWord, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try{
            const response = await axios.post(import.meta.env.VITE_APP_SERVER_LOGIN,{
               userName: userName,
               passWord: passWord,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if(response.data){
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated','true');
                navigate('/dashboard');
            }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <>
            <Container className='ul-Container'>
                <Form onSubmit={handleSubmit}>
                    <Container className='ul-Box-Container'>
                        
                        <Container className='ul-Container-Title'>
                            <h1 className='ul-Title'>Inventory</h1>
                        </Container>

                        <hr/>

                        <Form.Group>
                            <Form.Label className='ul-Label'>Email or Username</Form.Label><br/>
                            <Form.Control 
                                type='text'
                                className='ul-Control' 
                                value={userName}
                                placeholder='Enter email or username'
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