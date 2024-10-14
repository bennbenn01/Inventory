import { useState } from "react"
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import '../../../design/AddUser.css'
import axios from 'axios'

export default function AddUser(){
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [repeatPassword, setRepeatpassword] = useState('');
    const [address, setAddress] = useState({ street: '', city: '', country: '', province: '', zip: ''});
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [startedDate, setStarteddate] = useState('');
    const token = localStorage.getItem('token');

    const handleAddUser = async (e)=> {
        e.preventDefault();

        try{
            if(!firstName || !lastName || !userName || !passWord || !repeatPassword ||
                !address.street || !address.city || !address.country || !address.province || 
                !address.zip || !age || !position || !startedDate){
                alert("Please Fill-Up the Form");
                return;
            }

            if(passWord.length < 5){
                alert("The password was too short! Please try again");
                return;
            }

            if(passWord !== repeatPassword){
                alert("The password was mismatch");
                return;
            }

            const response = await axios.post(import.meta.env.VITE_APP_SERVER_NEW_USER, {
                firstName,
                lastName, 
                userName, 
                passWord,
                address,
                age: Number(age),
                position,
                startedDate,
            }, {
                headers: { 
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}` 
                }
            })
            
            if(response.status === 201)
            {
                alert("New User was been added");
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
                alert("Failed to add user: " + response.data.message); 
            }

        }catch(error){
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("An error occurred while adding the user: " + (error.response ? error.response.data.message : error.message));
        }
    }

    return(
        <>
            <Form> 
                <h2 className='d-AddUser-Form-Title'>Add User</h2>

                <Container>
                    <Row className='d-AddUser-Form-Row-Container-1'>
                        <Col md={2} className='d-AddUser-Form-Col-Container-1'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-1'>First Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter first name'
                                value={firstName}
                                className='d-AddUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setFirstname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddUser-Form-Col-Container-1'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-1'>Last Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter last name'
                                value={lastName}
                                className='d-AddUser-Form-Control-Sub-Col-1'
                                onChange={(e)=> setLastname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddUser-Form-Col-Container-1'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-1'>Username</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter username'
                                value={userName}
                                className='d-AddUser-Form-Control-Sub-Col-1'                                    
                                onChange={(e)=> setUsername(e.target.value)}/><br/>
                        </Col>
                        
                        <Col md={2} className='d-AddUser-Form-Col-Container-1'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-1'>Password</Form.Label>
                        </Col>
                        
                        <Col md={2}>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter password'
                                    value={passWord}
                                className='d-AddUser-Form-Control-Sub-Col-1'                                    
                                onChange={(e)=> setPassword(e.target.value)}/><br/>
                        </Col>
                        
                        <Col md={2} className='d-AddUser-Form-Col-Container-1'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-1'>Repeat Password</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter repeat password'
                                value={repeatPassword}
                                className='d-AddUser-Form-Control-Sub-Col-1' 
                                onChange={(e)=> setRepeatpassword(e.target.value)}/><br/>
                        </Col>
                    </Row>
                </Container>

                <hr/>
                
                <h2 className='d-AddUser-Form-Title'>Address</h2>

                <Container>
                    <Row className='d-AddUser-Form-Row-Container-2'>
                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>   
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Street</Form.Label>
                        </Col>
                        
                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter street'
                                value={address.street}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, street: e.target.value})}/>
                        </Col>

                        <Col md={2} className='d-AddUser-Form-Col-Container-2'> 
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>City</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter city'
                                value={address.city}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, city: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row className='d-AddUser-Form-Row-Container-2'>
                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Country</Form.Label>
                        </Col>
                        
                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter country'
                                value={address.country}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, country: e.target.value})}/>
                        </Col>

                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Province</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter province'
                                value={address.province}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, province: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row className='d-AddUser-Form-Row-Container-2'>
                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Zip</Form.Label>
                        </Col>

                        <Col md={4}>    
                            <Form.Control 
                                type='text' 
                                placeholder='Enter zip'
                                value={address.zip}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAddress({...address, zip: e.target.value})}/>
                        </Col>
                        
                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Age</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter age'
                                value={age}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setAge(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='d-AddUser-Form-Row-Container-2'>
                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Position</Form.Label>
                        </Col>

                        <Col md={4}> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter position'
                                value={position}
                                className='d-AddUser-Form-Control-Sub-Col-2'
                                onChange={(e)=> setPosition(e.target.value)}/>
                        </Col>

                        <Col md={2} className='d-AddUser-Form-Col-Container-2'>
                            <Form.Label className='d-AddUser-Form-Label-Sub-Col-2'>Started Date of Account</Form.Label>
                        </Col>

                        <Col md={4}>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={startedDate}
                                className='d-AddUser-Form-Control-Sub-Col-2'                                    
                                onChange={(e)=> setStarteddate(e.target.value)}/>
                        </Col>
                    </Row>
                </Container>

                <Container className='d-AddUser-Form-Button-Container'>
                    <Button 
                        onClick={handleAddUser}
                        className='d-AddUser-Form-Button'
                    >Add User</Button>
                </Container>
            </Form>
        </>
    );
}