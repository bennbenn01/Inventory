import { useState } from 'react';
import { Table } from 'react-bootstrap'
import '../../../design/ShowInfo.css'

export default function ShowInfo(){
    const [users, setUsers] = useState([]);

    return(
        <>
            {/*TODO:// Create a Admin_Dashboard displaying the information of the user*/}   
            <Table>
                <thead>
                    <tr>
                        <th className=''>ID</th>
                        <th className=''>First Name</th>
                        <th className=''>Last Name</th>
                        <th className=''>User Name</th>
                        <th className=''>Password</th>
                        <th className=''>Position</th>
                        <th className=''></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, i)=> {
                    <tr key={i}>
                        <td>{user || 'N/A'}</td>
                        <td>{user || 'N/A'}</td>
                        <td>{user || 'N/A'}</td>
                        <td>{user || 'N/A'}</td>
                        <td>{user || 'N/A'}</td>
                    </tr>
                    })}
                </tbody>
            </Table>
        </>
    );
}