import { useState, useEffect } from "react"
import axios from 'axios'
import { Container, Form, Button } from "react-bootstrap"
import '../../../design/FeedBack.css'

export default function FeedBack(){
    const [feedBack, setFeedBack] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleFeedbackSubmit = async (e)=> {
        e.preventDefault();

        try{
            if(!feedBack){
                alert("Please Fill-up the Feedback Form");
                return;
            }

            const response = await axios.post(import.meta.env.VITE_APP_SERVER_SEND_FEEDBACK, {
                feedBack,                
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            })
            
            if(response.status === 201){
                alert("Feedback was submitted successfully");
                setFeedBack('');
            }else{
                alert("Failed to submit feedback: " + response.data.message); 
            }
        }
        catch(error){
            console.error("Error: ", error.response ? error.response.data : error.message);
            alert("An error occurred while submitting feedback " + (error.response ? error.response.data.message : error.message));
        }
    }
    
    return(
        <>
            <Form>
                <Container className='s-FeedBack-Form-Container'>
                        <Form.Label
                            className='s-FeedBack-Form-Label'>Give us feedback on the user experience</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={10}
                            placeholder="Type your feedback here..."
                            value={feedBack}
                            className='s-FeedBack-Form-Control'
                            onChange={(e)=> setFeedBack(e.target.value)}/>


                        <Container className='s-FeedBack-Form-Button-Container'>
                            <Button
                                className='s-FeedBack-Form-Button'
                                onClick={handleFeedbackSubmit}>Sumbit Feedback</Button>
                        </Container>
                </Container>
            </Form>
        </>
    );
}