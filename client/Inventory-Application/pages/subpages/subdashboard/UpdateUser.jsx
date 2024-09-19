import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
import '../../../design/UpdateUser.css'
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

    const handleUpdateUser = async (e)=> {
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
                    headers: {"Content-Type": 'application/json'}
                })
    
            if(response.status >= 200 && response.status < 300){
                alert("The User's information was updated");
                setFirstname('');
                setLastname('');
                setPassword('');
                setRepeatpassword('');
                setAddress({ street: '', city: '', country: '', province: '', zip: '' });
                setAge('');
                setPosition('');
                setStarteddate('');
            }else{
                alert("Failed to update the user's information: " + response.data.message);
            }
        }catch(error){
            console.error("Error occurred while updating user: " + error.response ? error.response.data : error.message);
        }
    }

    return(
        <>
            <Form className='d-UpdateUser-Form-Container'>
                <h1 className='d-UpdateUser-Form-Title'>Update User</h1>
                <Form.Label className='d-UpdateUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter username'
                    value={userName}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setUsername(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password'
                    value={passWord}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setPassword(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Repeat Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter repeat password'
                    value={repeatPassword}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setRepeatpassword(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Address</Form.Label>

                <Form.Label className='d-UpdateUser-Form-Label'>Street</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter street'
                    value={address.street}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAddress({...address, street: e.target.value})}/>

                <Form.Label className='d-UpdateUser-Form-Label'>City</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter city'
                    value={address.city}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAddress({...address, city: e.target.value})}/><br/>
                
                <Form.Label className='d-UpdateUser-Form-Label'>Country</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter country'
                    value={address.country}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAddress({...address, country: e.target.value})}/>

                <Form.Label className='d-UpdateUser-Form-Label'>Province</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter province'
                    value={address.province}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAddress({...address, province: e.target.value})}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Zip</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter zip'
                    value={address.zip}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAddress({...address, zip: e.target.value})}/>

                <Form.Label className='d-UpdateUser-Form-Label'>Age</Form.Label>
                <Form.Control 
                    type='number' 
                    placeholder='Enter age'
                    value={age}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setAge(e.target.value)}/><br/>

                <Form.Label className='d-UpdateUser-Form-Label'>Position</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter position'
                    value={position}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setPosition(e.target.value)}/>

                <Form.Label className='d-UpdateUser-Form-Label'>Started Date of Account</Form.Label>
                <Form.Control 
                    type='date'
                    value={startedDate}
                    className='d-UpdateUser-Form-Control'
                    onChange={(e)=> setStarteddate(e.target.value)}/>

                <Container className='d-UpdateUser-Form-Button-Container'>
                    <Button 
                        className='d-UpdateUser-Form-Button'
                        onClick={handleUpdateUser}
                    >Update User</Button>
                </Container>
            </Form>
        </>
    );
}