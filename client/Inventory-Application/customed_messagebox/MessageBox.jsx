import { useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import '../design/MessageBox.css'

export default function MessageBox({message, onClose, show}){
    useEffect(()=> {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    },[show])

    return(
        <>
            <Container className={`m-Box-Container ${show ? 'show' : 'hide'}`}>
                <Container className='m-Content'>

                    <p>{message}</p>

                    <Container className='m-Button-Container'>
                        <Button 
                            className='m-Button'
                            onClick={onClose}
                            >Close</Button>
                    </Container>
                </Container>
            </Container>
        </>
    );
}