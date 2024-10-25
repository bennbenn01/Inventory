import { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap"
import MessageBox from "../../../customed_messagebox/MessageBox.jsx"
import axios from 'axios'
import '../../../design/FeedBack.css'

export default function FeedBack(){
    const [feedBack, setFeedBack] = useState('');
    const [token, setToken] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) 
            setToken(storedToken);
    }, []);

    const handleFeedbackSubmit = async (e)=> {
        e.preventDefault();

        try{
            if(!feedBack){
                setMessageContent("Please Fill-up the Feedback Form");
                setShowMessage(true);
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
                setMessageContent("Feedback was submitted successfully");
                setMessageContent(true);
                setFeedBack('');
            }else{
                setMessageContent("Failed to submit feedback: " + response.data.message); 
                setMessageContent(true);
            }
        }
        catch(error){
            console.error("Error: ", error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while submitting feedback " + (error.response ? error.response.data.message : error.message));
            setShowMessage(true);
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
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