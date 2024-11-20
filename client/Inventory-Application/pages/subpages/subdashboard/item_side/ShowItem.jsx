import { useEffect, useState } from 'react'
import { Container, Form, Table, Image, Button } from 'react-bootstrap'
import MessageBox from '../../../../customed_messagebox/MessageBox'
import QuestionMessageBox from '../../../../customed_messagebox/QuestionMessageBox'
import axios from 'axios'
import '../../../../design/ShowItem.css'

export default function ShowItem(){
    const [items, setItems] = useState([]);
    const [itemName, setItemname] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [showQuestionMessage, setShowQuestionmessage] = useState(false);
    const [questionMessagecontent, setQuestionMessageContent] = useState('');
    const token = localStorage.getItem('token');

    const handleShowItem = async(e)=> {
        e.preventDefault();

        try{
            const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_ITEM, {
                itemName
            },{
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

            
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while getting information of the item: " + 
            (error.response ? error.response.data.message : error.message));
            setShowMessage(true);
        }
    }

    useEffect(()=> {   
        const handleShowItems = async()=> {
            try{
                const response = await axios.get(import.meta.env.VITE_APP_SERVER_FIND_ITEMS, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                })

                const items = Array.isArray(response.data) ? response.data : [response.data];
                setItems(items);
            }catch(error){
                if(error.response = []){
                    setMessageContent("No Items found");
                    setShowMessage(true);
                }
            }
        }
    
        handleShowItems();
    },[token]);

    const handleDeleteItem = ()=> {
        setQuestionMessageContent("Do you want to Delete the Item?")
        setShowQuestionmessage(true);
    }

    const handleCloseMessage = ()=> {
        setShowMessage(false);
    }

    const handleYesButton = async(itemName, e)=> {
        e.preventDefault();

        try{
            const response = await axios.delete(import.meta.env.VITE_APP_SERVER_DELETE_ITEM, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: itemName  
                }
            })

            if(response.status === 200){
                setMessageContent("The Item has been deleted successfully");
                setShowMessage(true);
                setItems((prevItems) => prevItems.filter((item) => item.itemName !== itemName)); 
            }else{
                setMessageContent("Failed to delete a item: " + response.data.message);
                setShowMessage(true);
            }
        }catch(error){
            console.error(error.response ? error.response.data : error.message);
            setMessageContent("An error occurred while deleting the item: " + error ? error.response.data.message : error.message);
            setShowMessage(true);
        }
    }

    const handleNoButton = ()=> {
        setShowQuestionmessage(false);
    }

    return(
        <>
            <Container className='d-ShowItem-Table-Container'>
                <Container>
                    <h1 className='d-ShowItem-Table-Title'>List of Items</h1>

                    <Container className='d-ShowItem-Search-Container'>
                        <Form.Control
                            type='text'
                            placeholder='Search Item'
                            value={itemName}
                            className='d-ShowItem-Form-Control'
                            onChange={(e)=> setItemname(e.target.value)}
                        />

                        <Button className='d-ShowItem-Table-Button'
                                onClick={handleShowItem}>Search</Button>
                    </Container>
                </Container>

                <Container className='d-ShowItem-Scrollbar'>
                    <Table striped bordered className='d-ShowItem-Table-Main-Container'>
                        <thead className='d-ShowItem-THead-Container'>
                            <tr>
                                <th className='d-ShowItem-TH-Row'>Number of Items</th>
                                <th className='d-ShowItem-TH-Row'>Item Picture</th>
                                <th className='d-ShowItem-TH-Row'>Item Name</th>
                                <th className='d-ShowItem-TH-Row'>Started Date</th>
                                <th className='d-ShowItem-TH-Row'>Expiration Date</th>
                                <th className='d-ShowItem-TH-Row'>Item Price</th>
                                <th className='d-ShowItem-TH-Row'>Item Discount</th>
                                <th className='d-ShowItem-TH-Row'>Delete Item</th>
                            </tr>
                        </thead>
                        <tbody className='d-ShowItem-TBody-Container'> 
                            { items.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className='d-ShowItem-TD-Colspan'>No Items Found</td>
                                </tr>
                            ) : (
                                items.map((item, i)=> (
                                <tr key={i}>
                                    <td className='d-ShowItem-TD-Row'>{item.numberOfitems || 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'>
                                        {item.itemPicture ? (
                                            <>
                                                <Image
                                                    src={`${import.meta.env.VITE_APP_SERVER_BACKEND_PORT}${item.itemPicture}`}
                                                    alt={item.itemName}
                                                    width={50}
                                                    height={50}
                                                />   
                                            </>                                    
                                        ) : (
                                            'No Image Available'
                                        )}
                                    </td>
                                    <td className='d-ShowItem-TD-Row'>{item.itemName|| 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'>{item.startedDate|| 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'>{item.expirationDate|| 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'>{`${item.itemPrice}`|| 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'>{`${item.itemDiscount}%`|| 'N/A'}</td>
                                    <td className='d-ShowItem-TD-Row'><Button  
                                                                        className='d-ShowItem-TD-Row-Button'
                                                                        onClick={(e)=> handleDeleteItem(item.itemName, e)}>Delete Button</Button></td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Container>

            {showMessage && (
                <MessageBox
                    message={messageContent}
                    show={showMessage}
                    onClose={handleCloseMessage}
                />
            )}

            {showQuestionMessage && (
                <QuestionMessageBox
                    message={questionMessagecontent}
                    show={showQuestionMessage}
                    onYesClick={handleYesButton}
                    onNoClick={handleNoButton}
                />
            )}
        </>
    );
}