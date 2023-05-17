import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, index, refetch, }) => {
    //make admin e click korle user take admin banabe shetar client side evbe:
    const makeAdmin = () => {
        fetch(`http://localhost:5000/user/admin/${user?.email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            }) //multiline korle oboshhoi res.json() ke return korte hoy
            .then(data => {
                if (data.modifiedCount > 0) { //modifiedCount ta data er vitor ase.console log korlei buja jai
                    refetch();//makeadmin e click korle sathe sathe update hoye jabe,page reload deya lagbe na
                    toast.success(`Successfully made an admin`);
                }
            })

    }

    return (

        <tr>
            <th>{index + 1}</th>
            <td>{user.email}</td>
            {/* jodi user er role admin nahoy tahole take makeAdmin button dekhabo */}
            <td>{user.role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button class="btn btn-xs">Delete User</button></td>

        </tr>

    );
};

export default UserRow;