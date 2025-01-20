import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import {Edit, ShieldBan, ShieldCheck, Trash, User as UserSVG} from "lucide-react";
import {User} from "@/lib/types.ts";
import {useToast} from "@/hooks/use-toast.ts";
import apiClient from "@/lib/apiClient.ts";
import {useState} from "react";
import UpdateUserDialog from "@/components/UpdateUserDialog.tsx";
import {isAdmin} from "@/lib/utils.ts";


interface AccountProp {
  refresh: () => void,
  users: User[],
  connectedUser: User
}

export default function AccountTable({refresh, users, connectedUser}: AccountProp ) {
  const { toast } = useToast();

  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [userToUpdate, setUserToUpdate] = useState<User|undefined>(undefined);

  function handleDelete(user: User)  {
    apiClient.delete(`api/users/${user.id}`)
      .then(() => {
        toast({description: "User deleted"});
        refresh();
      })
      .catch((err) => {
        console.log(err);
        toast({description: "Something went wrong", variant: "destructive"});
      })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isAdmin()}Nom</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            users.map((user) => {
              const isNotMe = user.id !== connectedUser.id;
              const isAdmin = user.isAdmin ? 'Admin' : 'User';
              const date = new Date(user.createdAt);
              const isTemp = user.beginDate && user.endDate;
              let isActive = true;
              if (isTemp) {
                isActive = new Date() >= new Date(new Date(user.beginDate).setHours(0, 0, 0, 0)) && new Date() <= new Date(new Date(user.endDate).setHours(23, 59, 59, 999));
              }
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.isAdmin ? <UserSVG className={"inline"}/> : undefined} {user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{date.toLocaleString()}</TableCell>
                  <TableCell>{isAdmin}</TableCell>
                  <TableCell>
                    <div className='flex flex-row items-center gap-1'>
                      {
                        isActive
                          ? <ShieldCheck />
                          : <ShieldBan />
                      }
                      {user.beginDate && user.endDate
                      ? `Temporary user from ${new Date(user.beginDate).toLocaleDateString()} to ${new Date(user.endDate).toLocaleDateString()}`
                      : "Permanent user"
                      }
                    </div>
                  </TableCell>
                  <TableCell className={"flex flex-col gap-1 items-center md:flex-row"}>
                    {isNotMe
                      ? <Button variant={"destructive"} size={"icon"}
                                onClick={() => handleDelete(user)}><Trash/></Button>
                      : undefined
                    }
                    <Button size={"icon"}
                            onClick={() => {
                              setUserToUpdate(user);
                              setUpdateOpen(true);
                            }}>
                      <Edit/>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
      <UpdateUserDialog refresh={refresh} user={userToUpdate} open={updateOpen} setOpen={setUpdateOpen}/>
    </>
  )
}