import { useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import MessageBox from '../../../../customed_messagebox/MessageBox'
import '../../../../design/AddItem.css'
import axios from 'axios'

export default function AddItem(){
    const [numberOfitems, setNumberofitems] = useState('');
    const [itemPicture, setItempicture] = useState(null);
    const [itemName, setItemname] = useState('');
    const [startedDate, setStarteddate] = useState('');
    const [expirationDate, setExpirationdate] = useState('');
    const [itemPrice, setItemprice] = useState('');
    const [itemDiscount, setItemdiscount] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const token = localStorage.getItem('token');

    const formData = new FormData();
    
    formData.append('numberOfitems', numberOfitems);
    formData.append('itemPicture', itemPicture); 
    formData.append('itemName', itemName);
    formData.append('startedDate', startedDate);
    formData.append('expirationDate', expirationDate);
    formData.append('itemPrice', itemPrice);
    formData.append('itemDiscount', itemDiscount);


    const handleFileChange = (e)=> {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setItempicture(selectedFile);
        }
    }

    const handleAddItem = async (e)=> {
        e.preventDefault();

        try{
            if(!itemPicture || !itemName || !expirationDate || !itemPrice ||
                !itemDiscount){
                setMessageContent("Please Fill-Up the Form");
                setShowMessage(true);
                return;
            }

            if(numberOfitems < 0){
                setMessageContent("The number of items should not be less than 0");
                setShowMessage(true);
                return;
            }

            if(itemPrice < 0){
                setMessageContent("The price of item should not be less than 0");
                setShowMessage(true);
                return;
            }

            if(itemDiscount < 0){
                setMessageContent("The discount number should not be less than 0");
                setShowMessage(true);
                return;    
            }
    
            const response = await axios.post(import.meta.env.VITE_APP_SERVER_NEW_ITEM, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })

            if(response.status === 201){
                setMessageContent("New item was been added");
                setShowMessage(true);
                setNumberofitems('');
                setFileName("")
                setItemname('');
                setStarteddate('');
                setExpirationdate('');
                setItemprice('');
                setItemdiscount('');
            }else{
                setMessageContent("Failed to add item: " + response.data.message);
                setShowMessage(true);
            }
        }catch(error){
            console.error("Error: ", error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while adding the item: " + (error.response ? error.response.data.message : error.message));
            setShowMessage(true);
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    return(
        <>
            <Form>
                <h2 className='d-AddItem-Form-Title'>Add Item</h2>

                <Container>
                    <Row className='d-AddItem-Form-Row-Container'>
                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Number of Items</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter number of items'
                                value={numberOfitems}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setNumberofitems(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Item Picture</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='file'
                                accept='image/*'
                                className='d-AddItem-Form-File-Control-Sub-Col'
                                onChange={handleFileChange}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Item Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter item name'
                                value={itemName}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Started Date</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={startedDate}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setStarteddate(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Expiration Date</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={expirationDate}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setExpirationdate(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Item Price</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter Item Price'
                                value={itemPrice}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemprice(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-AddItem-Form-Col-Container'>
                            <Form.Label className='d-AddItem-Form-Label-Sub-Col'>Item Discount</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter Item Discount'
                                value={itemDiscount}
                                className='d-AddItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemdiscount(e.target.value)}/><br/>
                        </Col>
                    </Row>
                </Container>

                <Container className='d-AddItem-Form-Buttom-Container'>
                    <Button
                        onClick={handleAddItem}
                        className='d-AddItem-Form-Button'
                        >Add Item</Button>
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