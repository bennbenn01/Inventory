import { useState } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'
import MessageBox from "../../../customed_messagebox/MessageBox.jsx"
import '../../../design/ShowUsers.css'
import axios from 'axios'  

export default function ShowUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [users, setUsers] = useState([]);
    const [position, setPosition] = useState('');
    const [startedDate, setStarteddate] = useState('');
    const token = localStorage.getItem('token');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const handleFindUser = async (e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName){
                setMessageContent("No firstname or lastname was inputted");
                setShowMessage(true);
                return;
            }

            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USER, {
                params: {firstName, lastName},
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
        
            setUsers(Array.isArray(response.data) ? response.data : [response.data]);
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while getting information of the user" + (error.response ? error.response.data.message : error.message));
            setShowMessage(true);
        }
    }

    const handleFindUsers = async (e)=> {
        e.preventDefault();

        if(!token){
            console.log('Token is not defined');
            return;
        }

        try{
            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_USERS, {
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

            setFirstname('');
            setLastname('');
            setUsers(Array.isArray(response.data) ? response.data : []);
        }catch(error){
            if(error.response = []){
                setMessageContent("No Users Found");
                setShowMessage(true);
            }
        }
    }

    return(
        <>
            <Form className='d-ShowUser-Form-Container'>
                <h1 className='d-ShowUser-Form-Title'>Show Users</h1>
                <Form.Label className='d-ShowUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-ShowUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-ShowUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-ShowUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>
            
                <Container className='d-ShowUser-Form-Button-Container'>
                    <Button 
                        className='d-ShowUser-Form-Button-1'
                        onClick={handleFindUser}
                        >Show User</Button>

                    <Button 
                        className='d-ShowUser-Form-Button-2'
                        onClick={handleFindUsers}
                        >Show All Users</Button>
                </Container>
            </Form>

            <Container className='d-ShowUser-Table-Container'>
                <h1 className='d-ShowUser-Form-Title'>List of Users</h1>
                <Table striped bordered className='d-ShowUser-Table-Main-Container'>
                    <thead className='d-ShowUser-THead-Container'>
                        <tr>
                            <th className='d-ShowUser-TH-Row'>ID</th>
                            <th className='d-ShowUser-TH-Row'>First Name</th>
                            <th className='d-ShowUser-TH-Row'>Last Name</th>
                            <th className='d-ShowUser-TH-Row'>User Name</th>
                            <th className='d-ShowUser-TH-Row'>Position</th>
                            <th className='d-ShowUser-TH-Row'>Role</th>
                            <th className='d-ShowUser-TH-Row'>Started Date</th>
                        </tr>
                    </thead>
                    <tbody className='d-ShowUser-TBody-Container'>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={7} className='d-ShowUser-TD-Colspan'>No Users Found</td>
                        </tr>       
                    ) : (
                        users.map((user, i)=> (
                        <tr key={i}>
                            <td className='d-ShowUser-TD-Row'>{user._id || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.firstName || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.lastName || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.userName || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.position || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.role || 'N/A'}</td>
                            <td className='d-ShowUser-TD-Row'>{user.startedDate || 'N/A'}</td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Container>

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