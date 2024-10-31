import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Container, Table, Button } from "react-bootstrap"
import '../../../../design/ShowUsers.css'

export default function ShowUsersTable(){
    const [users, setUsers] = useState([]);
    const [position, setPosition] = useState('');
    const [startedDate, setStarteddate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('users');
        if (storedUserInfo) {
            setUsers(JSON.parse(storedUserInfo));
        }
    }, []);

    const handleReturnButton = ()=> {
        navigate('/admin_dashboard/shows_users/show_users_form');
    }

    return(
        <>
            <Container className='ad-ShowUser-Table-Container'>
                <Container>
                    <Button 
                        className='ad-ShowUser-Table-Button'
                        onClick={handleReturnButton}
                        >Back</Button>
                    <h1 className='ad-ShowUser-Table-Title'>List of Users</h1>
                </Container>

                <Container className='ad-ShowUser-Scrollbar'>
                    <Table striped bordered className='ad-ShowUser-Table-Main-Container'>
                        <thead className='ad-ShowUser-THead-Container'>
                            <tr>
                                <th className='ad-ShowUser-TH-Row'>First Name</th>
                                <th className='ad-ShowUser-TH-Row'>Last Name</th>
                                <th className='ad-ShowUser-TH-Row'>User Name</th>
                                <th className='ad-ShowUser-TH-Row'>Position</th>
                                <th className='ad-ShowUser-TH-Row'>Role</th>
                                <th className='ad-ShowUser-TH-Row'>Started Date</th>
                            </tr>
                        </thead>
                        <tbody className='ad-ShowUser-TBody-Container'>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className='ad-ShowUser-TD-Colspan'>No Users Found</td>
                            </tr>       
                        ) : (
                            users.map((user, i)=> (
                            <tr key={i}>
                                <td className='ad-ShowUser-TD-Row'>{user.firstName || 'N/A'}</td>
                                <td className='ad-ShowUser-TD-Row'>{user.lastName || 'N/A'}</td>
                                <td className='ad-ShowUser-TD-Row'>{user.userName || 'N/A'}</td>
                                <td className='ad-ShowUser-TD-Row'>{user.position || 'N/A'}</td>
                                <td className='ad-ShowUser-TD-Row'>{user.role || 'N/A'}</td>
                                <td className='ad-ShowUser-TD-Row'>{user.startedDate || 'N/A'}</td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    );
}