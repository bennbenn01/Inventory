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
            <Container className='d-Settings-Main-Container'>
                <h1 className='d-Settings-Title'>Settings</h1>

                <Container className='d-Settings-Container'>
                    
                    <Form.Label className='d-Settings-Label'>Theme</Form.Label>

                    <Button
                        className='d-Settings-Button' 
                        onClick={onToggleMode}
                    >{isDarkMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</Button>

                    <Form.Label className='d-Settings-Label'>Feedback</Form.Label>

                    <Button
                        className='d-Settings-Button'
                        onClick={handleFeedbackOption}
                    >Sumbit Feedback</Button>
                </Container>
            </Container>
        </Form>
    );
}