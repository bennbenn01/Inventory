import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import '../../design/AddItem.css'

export default function Dashboard(){
    return(
        <>
            <Container>
                <Container>
                    
                </Container>

                <Container>
                    <Outlet/>
                </Container>
            </Container>
        </>
    );
}