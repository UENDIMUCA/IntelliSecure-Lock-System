import UserInfoForm from "@/components/UserInfoForm.tsx";
import {getLoggedUser, refreshLoggedUser} from "@/lib/utils.ts";
import {useState} from "react";
import {User} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";
import {toast} from "@/hooks/use-toast.ts";

const UserPage = () => {
  const [user, setUser] = useState<User|undefined>(getLoggedUser());
  const [open, setOpen] = useState<boolean>(false);

  const refresh = () => {
    refreshLoggedUser()
      .then(() => {
        setUser(getLoggedUser());
        toast({description: "User's up to date"});
      })
      .catch((err) => {
        console.log(err);
        toast({description: "An error occurred while refreshing user's data", variant: "destructive"});
      });
  };

  open.valueOf();

  return (
    <div className={"w-full md:w-1/2 px-2"}>
      <div className={"flex flex-row items-center"}>
        <p className={"text-lg mr-2"}>Your pin code is {user?.pincode}</p>
        <Button onClick={refresh}><RefreshCw/></Button>
      </div>
      <UserInfoForm refresh={refresh} setOpen={setOpen} user={user}/>
    </div>
  );
}

export default UserPage;