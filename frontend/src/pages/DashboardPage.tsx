import {useEffect, useState} from "react";
import {getLoggedUser} from "@/lib/utils.ts";
import {User} from "@/lib/types.ts";
import LogoutButton from "@/components/LogoutButton.tsx";
import apiClient from "@/lib/apiClient.ts";

const DashboardPage = () => {
    const [user, setUser] = useState<User|null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const user = getLoggedUser();
        setUser(user);
        apiClient.get('/api/users')
            .then((res) =>{
                console.log(res.data[0]);
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Welcome {user ? user.username : 'null'}</h1>
            <LogoutButton/>
            <ul className="list-disc">
                {users.map((user) =>
                    <li key={user.id}>{user.username} {user.email} {user.isAdmin ? 'admin' : 'not admin'}</li>
                )}
            </ul>
        </div>
    );
}

export default DashboardPage;