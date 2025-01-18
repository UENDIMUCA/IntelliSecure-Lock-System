import {useEffect, useState} from "react";
import axios from "axios";
import {getLoggedUser} from "@/lib/utils.ts";
import {LoggedUser, User} from "@/lib/types.ts";
import LogoutButton from "@/components/LogoutButton.tsx";
import NeedLogged from "@/lib/NeedLogged.tsx";

const DashboardPage = () => {
    const [user, setUser] = useState<LoggedUser|null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = getLoggedUser();
        setUser(user);
        axios.get('/api/users', {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then((res) =>{
                console.log(res.data[0]);
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NeedLogged adminRight={true}/>
            <h1>Welcome {user ? user.login : 'null'}</h1>
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