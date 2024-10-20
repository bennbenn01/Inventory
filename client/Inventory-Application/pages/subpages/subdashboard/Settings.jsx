import { Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../../design/Settings.css'

export default function Settings({onToggleMode, isDarkMode}) {
    const navigate = useNavigate();
    
    const handleFeedbackOption = ()=> {
        navigate('/dashboard/feedback');
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