    import React, { useEffect, useState } from "react";
    import HeaderAdmin from "../../Layout/HeaderAdmin";
    import Sidebar from "../../Layout/Sildebar";
    import axios from "axios";

    function ManagerUser() {
        const [users, setUsers] = useState([]);

        useEffect(() => {
            // Gửi yêu cầu GET đến URL "http://localhost:8000/users"
            fetch("http://localhost:8000/users")
                .then((response) => response.json())
                .then((data) => {
                    // Lọc danh sách người dùng để loại bỏ người dùng có vai trò "admin"
                    const filteredUsers = data.filter(
                        (user) => user.role !== "admin"
                    );
                    setUsers(filteredUsers);
                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách người dùng", error);
                });
        }, []);

        const blockUser = async (userId) => {
            
            try {
                const user = users.find((user) => user.id === userId);
                const updatedStatus = user.status === "blocked" ? "" : "blocked";
        
                await axios.patch(`http://localhost:8000/users/${userId}`, {
                    status: updatedStatus,
                });
        
                // Cập nhật trạng thái (status) của user trong danh sách hiện tại
                setUsers((prevUsers) =>
                    prevUsers.map((prevUser) =>
                        prevUser.id === userId ? { ...prevUser, status: updatedStatus } : prevUser
                    )
                );
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái người dùng", error);
            }
        };

        return (
            <div className="grid-container">
                <HeaderAdmin />
                <Sidebar />
                <main className="main-container">
                    <div className="main-title">
                        <h3>Manager User</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Ngày sinh</th>
                                <th>Block</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.birthday}</td>
                                    <td>
                                            <button onClick={() => blockUser(user.id)}>
                                                {user.status === "blocked" ? "Unblock" : "Block"}
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        );
    }

    export default ManagerUser;
