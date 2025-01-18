import {Button} from "@/components/ui/button.tsx";
import {logout} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton;