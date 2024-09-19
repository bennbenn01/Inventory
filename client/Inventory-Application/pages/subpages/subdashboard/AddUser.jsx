import { useState } from "react"
import { Container, Form, Button } from 'react-bootstrap'
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
                startedDate: new Date('yyyy-mm-dd')
            }, {
                headers: { 
                    "Content-Type": 'application/json'
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
            <Form className='d-AddUser-Form-Container'>
                <h1 className='d-AddUser-Form-Title'>Add User</h1>                
  
                <Form.Label className='d-AddUser-Form-Label'>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter first name'
                    value={firstName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setFirstname(e.target.value)}/>

                <Form.Label className='d-AddUser-Form-Label'>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter last name'
                    value={lastName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setLastname(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter username'
                    value={userName}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setUsername(e.target.value)}/>

                    <Form.Label className='d-AddUser-Form-Label'>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password'
                    value={passWord}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setPassword(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Repeat Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter repeat password'
                    value={repeatPassword}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setRepeatpassword(e.target.value)}/>

                <Form.Label className='d-AddUser-Form-Label'>Address</Form.Label>

                <Form.Label className='d-AddUser-Form-Label'>Street</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter street'
                    value={address.street}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAddress({...address, street: e.target.value})}/>

                <Form.Label className='d-AddUser-Form-Label'>City</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter city'
                    value={address.city}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAddress({...address, city: e.target.value})}/><br/>
                
                <Form.Label className='d-AddUser-Form-Label'>Country</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter country'
                    value={address.country}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAddress({...address, country: e.target.value})}/>

                <Form.Label className='d-AddUser-Form-Label'>Province</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter province'
                    value={address.province}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAddress({...address, province: e.target.value})}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Zip</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter zip'
                    value={address.zip}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAddress({...address, zip: e.target.value})}/>

                <Form.Label className='d-AddUser-Form-Label'>Age</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter age'
                    value={age}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setAge(e.target.value)}/><br/>

                <Form.Label className='d-AddUser-Form-Label'>Position</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter position'
                    value={position}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setPosition(e.target.value)}/>

                <Form.Label className='d-AddUser-Form-Label'>Started Date of Account</Form.Label>
                <Form.Control 
                    type='date'
                    value={startedDate}
                    className='d-AddUser-Form-Control'
                    onChange={(e)=> setStarteddate(e.target.value)}/>

                <Container className='d-AddUser-Form-Button-Container'>
                    <Button 
                        className='d-AddUser-Form-Button'
                        onClick={handleAddUser}
                    >Add User</Button>
                </Container>
            </Form>
        </>
    );
}