import { useState } from "react"
import { Container, Form, Button, Col, Row } from "react-bootstrap"
import MessageBox from "../../../../customed_messagebox/MessageBox"
import '../../../../design/UpdateItem.css'
import axios from "axios"

export default function UpdateItem(){
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

    const handleUpdateItem = async(e)=> {
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

            const response = await axios.put(import.meta.env.VITE_APP_SERVER_UPDATE_ITEM, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })

            if(response.status === 200){
                setMessageContent("Item was been updated");
                setShowMessage(true);
                setNumberofitems('');
                setItempicture(null);
                setItemname('');
                setStarteddate('');
                setExpirationdate('');
                setItemprice('');
                setItemdiscount('');
            }else{
                setMessageContent("Failed to update the item's information: " + response.data.message);
                setShowMessage(true);
            }
        }catch(error){
            console.error("Error: ", error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while updating the item: " + (error.response ? error.response.data.message : error.message));
            setShowMessage(true); 
        }
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    return(
        <>
            <Form>
                <h2 className='d-UpdateItem-Form-Title'>Update Item</h2>

                <Container>
                    <Row className='d-UpdateItem-Form-Row-Container'>
                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Number of Items</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter number of items'
                                value={numberOfitems}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setNumberofitems(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Item Picture</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='file'
                                accept='image/*'
                                className='d-UpdateItem-Form-File-Control-Sub-Col'
                                onChange={handleFileChange}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Item Name</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter item name'
                                value={itemName}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemname(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Started Date</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={startedDate}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setStarteddate(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Expiration Date</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='text'
                                placeholder='Enter Date (ex. mm-dd-yyyy)'
                                value={expirationDate}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setExpirationdate(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Item Price</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter Item Price'
                                value={itemPrice}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemprice(e.target.value)}/><br/>
                        </Col>

                        <Col md={2} className='d-UpdateItem-Form-Col-Container'>
                            <Form.Label className='d-UpdateItem-Form-Label-Sub-Col'>Item Discount</Form.Label>
                        </Col>

                        <Col md={2}>
                            <Form.Control
                                type='number'
                                placeholder='Enter Item Discount'
                                value={itemDiscount}
                                className='d-UpdateItem-Form-Control-Sub-Col'
                                onChange={(e)=> setItemdiscount(e.target.value)}/><br/>
                        </Col>
                    </Row>
                </Container>

                <Container className='d-UpdateItem-Form-Buttom-Container'>
                    <Button
                        onClick={handleUpdateItem}
                        className='d-UpdateItem-Form-Button'
                        >Update Item</Button>
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