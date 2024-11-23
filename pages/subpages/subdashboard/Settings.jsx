import { Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../../design/Settings.css'

export default function Settings({onToggleMode, isDarkMode}) {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleFeedbackOption = ()=> {
        if(role === 'admin'){
            navigate('/admin_dashboard/feedback'); 
        }else if(role === 'user'){
            ('/dashboard/feedback');
        }
        else{
            setMessageContent("Error on getting the role of user/admin");
            setShowMessage(true);
        }
    }

    return(
        <Form>
            <Container className='d-Settings-Form-Main-Container'>
                <h1 className='d-Settings-Form-Title'>Settings</h1>

                <Container className='d-Settings-Sub-Container'>
                    
                    <Form.Label className='d-Settings-Form-Label'>Theme</Form.Label>

                    <Button
                        className='d-Settings-Form-Button' 
                        onClick={onToggleMode}
                    >{isDarkMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</Button>

                    <Form.Label className='d-Settings-Form-Label'>Feedback</Form.Label>

                    <Button
                        className='d-Settings-Form-Button'
                        onClick={handleFeedbackOption}
                    >Sumbit Feedback</Button>
                </Container>
            </Container>
        </Form>
    );
}