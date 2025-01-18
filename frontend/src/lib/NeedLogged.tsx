import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {isAdmin, isLogged} from "@/lib/utils.ts";

type Prop = {
  adminRight: boolean
}

const NeedLogged = ({adminRight} : Prop) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (adminRight) {
      if (!isAdmin()) navigate(-1);
    } else {
      if(!isLogged()) navigate(-1);
    }
  }, [navigate, adminRight]);

  return(
    <></>
  );
}

NeedLogged.defaultProps = {adminRight: false};

export default NeedLogged