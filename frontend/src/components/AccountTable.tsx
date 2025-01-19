import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import {Trash, User as UserSVG} from "lucide-react";
import {User} from "@/lib/types.ts";
import {useToast} from "@/hooks/use-toast.ts";


interface AccountProp {
  users: User[],
  connectedUser: User
}

export default function AccountTable({users, connectedUser}: AccountProp ) {
  const { toast } = useToast();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Date de création</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          users.map((user) => {
            const isNotMe = user.id !== connectedUser.id;
            const isAdmin = user.isAdmin ? 'Admin' : 'User';
            const date = new Date(user.createdAt);
            return (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{date.toLocaleString()}</TableCell>
                <TableCell>{isAdmin}</TableCell>
                <TableCell className={"flex flex-col gap-1 items-center md:flex-row"}>
                  {!isNotMe
                    ? <Button variant={"destructive"} size={"icon"}
                              onClick={() => toast({description: `${user.username} should be removed`})}><Trash/></Button>
                    : <UserSVG/>
                  }
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  )
}