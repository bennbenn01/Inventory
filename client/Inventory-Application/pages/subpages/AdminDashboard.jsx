import { Outlet } from 'react-router-dom';
import '../../design/AdminDashboard.css'
import { Container } from 'react-bootstrap';

export default function AdminDashboard(){

    return(
        <>
            <Container className='ad-Container'>
                <Container className='box ad-Box-Container'>
                    <Outlet/>
                </Container>
            </Container>
        </>
    );
}