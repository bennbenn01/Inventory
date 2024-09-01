import { Container, Tables, Button } from "react-bootstrap"
import '/design/Dashboard.css'
import axios from 'axios'

export default function Dashboard(){

    const HandleFindUser = async (e)=> {
        e.preventDefault();

        try{
            const response = await axios.get(import.meta.env.VITE_APP_FIND_USER, {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
            }, {
                headers : {
                    "Content-Type": 'application/json'
                }
            })

            //Show Information in a Message Box
            
        }catch(error){
            console.error(error);
        }
    }

    const HandleNewUser = async (e)=> {
        e,preventDefault();

        try{

        }catch(error){
            console.error(error);
        }

        //
    }

    const HandleUpdateUser = async (e)=> {
        e,preventDefault();

        try{
            const response = await axios.post({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord, 
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
        }catch(error){
            console.error(error);
        }

        //
    }

    const HandleDeleteUser = async (e)=> {
        e,preventDefault();

        try{
            const response = await axios.delete({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord, 
            }, {
               headers: {
                    "Content-Type": 'application/json' 
               } 
            })
        }catch(error){
            console.error(error);
        }

        //
    }

    return(
        <>
            <Container className='d-Container'>
                <Container className='d-Box-Container'>

                    <Container className='d-Button-Container'>
                        <Button>Find User</Button>

                        <Button>Add New User</Button>

                        <Button>Update User</Button>

                        <Button>Delete User</Button>
                    </Container>
                </Container>
            </Container>
        </>
    );
}