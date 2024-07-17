import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from "../assets/Avatar.jpg"
import UserDetail from './UserDetail';

function Users() {
    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState(null);

    const closeUserDetail = () => {
        setUserDetail(null);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    },[])

    const deleteUser = (index) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) 
            axios.delete(`http://localhost:3001/api/users/delete/${users[index]._id}`)
                .then(response => {
                    setUsers(users.filter((user, i) => i !== index));
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                });
    }

    return (
        <>  
            {(userDetail !== null) && <UserDetail user={users[userDetail]} onClose={closeUserDetail} />}
            <div id="user-table-container">
                <h1>Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Mở chi tiết</th>
                            <th>Xóa khách hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><img style={{height: "50px"}} src={Avatar} /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td><button onClick={() => {setUserDetail(index)}}>Chi tiết</button></td>
                                <td><button onClick={() => deleteUser(index)}>Xóa</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users