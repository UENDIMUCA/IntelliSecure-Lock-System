import {useEffect, useState} from "react";
import {getLoggedUser} from "@/lib/utils.ts";
import {User} from "@/lib/types.ts";
import apiClient from "@/lib/apiClient.ts";
import AccountTable from "@/components/AccountTable.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";

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

    if (!user) {
      return (
        <div>
          <h1>Loading ...</h1>
        </div>
      )
    } else {
      return (
          <div className="w-full">
              <h1>Welcome {user ? user.username : 'null'}</h1>
              <ScrollArea>
                <AccountTable users={users} connectedUser={user}/>
                <ScrollBar orientation={'horizontal'}/>
              </ScrollArea>
          </div>
      );
    }

}

export default DashboardPage;