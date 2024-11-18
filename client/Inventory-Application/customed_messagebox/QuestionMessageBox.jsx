import { useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import '../design/QuestionMessageBox.css'

export default function QuestionMessageBox({message, onYesClick, onNoClick, show}){
    useEffect(()=> {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    },[show])

    return(
        <>
            <Container className={`qm-Box-Container ${show ? 'show' : 'hide'}`}>
                <Container className='qm-Content'>

                    <p>{message}</p>

                    <Container className='qm-Button-Container'>
                        <Button 
                            className='qm-Button'
                            onClick={onYesClick}
                            >Yes</Button>

                        <Button 
                            className='qm-Button'
                            onClick={onNoClick}
                            >No</Button>    
                    </Container>
                </Container>
            </Container>
        </>
    );
}