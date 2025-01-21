import {Button} from "@/components/ui/button.tsx";
import {logout} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "@/hooks/use-toast.ts";

const LogoutButton = () => {
  const navigate = useNavigate();
  async function handleLogout() {
    if (await (logout())) {
      navigate("/");
    } else {
      toast({description: "Error logging out", variant: "destructive"});
    }
  }
  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  )
}

export default LogoutButton;