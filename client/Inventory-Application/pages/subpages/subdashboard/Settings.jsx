import { Form, Container, Button } from "react-bootstrap";
import '../../../design/Settings.css'

export default function Settings() {

    const handleThemeChange = ()=> {

    }

    return(
        <Form>
            <Container>
                <Container className='d-Settings-Container'>
                    <Form.Label className='d-Settings-Label'>Theme</Form.Label>

                    <Button
                        className='d-Settings-Button' 
                        onClick={handleThemeChange}>Mode</Button>
                </Container>
            </Container>
        </Form>
    );
}