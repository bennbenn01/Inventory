import { useState } from "react"
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import MessageBox from "../../../../customed_messagebox/MessageBox.jsx"
import '../../../../design/UpdateUser.css'
import axios from 'axios'

export default function UpdateUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [repeatPassword, setRepeatpassword] = useState('');
    const [address, setAddress] = useState({ street: '', city: '', country: '', province: '', zip: ''});
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [startedDate, setStarteddate] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const token = localStorage.getItem('token');

    const handleUpdateUser = async (e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName || !userName || !passWord || !repeatPassword ||
                !address.street || !address.city || !address.country || !address.province || 
                !address.zip || !age || !position || !startedDate){
                setMessageContent("Please Fill-Up the Form");
                setShowMessage(true);
                return;
            }
    
            if(passWord.length < 5){
                setMessageContent("The password was too short! Please try again");
                setShowMessage(true);
                return;
            }
    
            if(passWord !== repeatPassword){
                setMessageContent("The password was mismatch");
                setShowMessage(true);
                return;
            }
    
            const response = await axios.put(import.meta.env.VITE_APP_SERVER_UPDATE_USER, {
                firstName, 
                lastName, 
                userName, 
                passWord, 
                address,
                age: Number(age), 
                position,
                startedDate
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
    
            if(response.status >= 200 && response.status < 300){
                setMessageContent("The User's information was updated");
                setShowMessage(true);
                setFirstname('');
                setLastname('');
                setUsername('');
                setPassword('');
                setRepeatpassword('');
                setAddress({ street: '', city: '', country: '', province: '', zip: '' });
                setAge('');
                setPosition('');
                setStarteddate('');
            }else{
                setMessageContent("Failed to update the user's information: " + response.data.message);
                setShowMessage(true);
            }
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while updating the user: " + error ? error.response.data.message : error.message);
            setShowMessage(true);
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    return(
        <>
            <Form>
                <h2 className='ad-UpdateUser-Form-Title'>Update User</h2>                
                
                <Container>
                    <Row className='ad-UpdateUser-Form-Row-Container-1'>
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-1'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-1'>First Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter first name'
                                value={firstName}
                                className='ad-UpdateUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setFirstname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-1'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-1'>Last Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter last name'
                                value={lastName}
                                className='ad-UpdateUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setLastname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-1'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-1'>Username</Form.Label>
                        </Col>

                        <Col md={2}> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter username'
                                value={userName}
                                className='ad-UpdateUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setUsername(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-1'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-1'>Previous Password</Form.Label>
                        </Col>
                            
                        <Col md={2}>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter password'
                                value={passWord}
                                className='ad-UpdateUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setPassword(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-1'> 
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-1'>Repeat Password</Form.Label>
                        </Col>
                        
                        <Col md={2}>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter repeat password'
                                value={repeatPassword}
                                className='ad-UpdateUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setRepeatpassword(e.target.value)}/><br/>
                        </Col>
                    </Row>
                </Container>

                <hr/>

                <h2 className='ad-UpdateUser-Form-Title'>Address</h2>

                <Container>
                    <Row className='ad-UpdateUser-Form-Row-Container-2'>
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Street</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter street'
                                value={address.street}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, street: e.target.value})}/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>City</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter city'
                                value={address.city}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, city: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row className='ad-UpdateUser-Form-Row-Container-2'>
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Country</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter country'
                                value={address.country}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, country: e.target.value})}/>
                        </Col>

                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Province</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter province'
                                value={address.province}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, province: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row className='ad-UpdateUser-Form-Row-Container-2'>
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Zip</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter zip'
                                value={address.zip}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, zip: e.target.value})}/>
                        </Col>
                        
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Age</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter age'
                                value={age}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAge(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='ad-UpdateUser-Form-Row-Container-2'>
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Position</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter position'
                                value={position}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setPosition(e.target.value)}/>
                        </Col>
                            
                        <Col md={2} className='ad-UpdateUser-Form-Col-Container-2'>    
                            <Form.Label className='ad-UpdateUser-Form-Label-Sub-Col-2'>Started Date of Account</Form.Label>
                        </Col>
                        
                        <Col md={4}>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={startedDate}
                                className='ad-UpdateUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setStarteddate(e.target.value)}/>
                        </Col>
                    </Row>
                </Container>

                <Container className='ad-UpdateUser-Form-Button-Container'>
                    <Button 
                        onClick={handleUpdateUser}
                        className='ad-UpdateUser-Form-Button'
                    >Update User</Button>
                </Container>
            </Form>

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