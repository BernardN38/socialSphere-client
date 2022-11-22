import axios from "axios";
import { serverUrl } from "../../config";
import { useNavigate } from "react-router-dom";

function LoginLogic(){
    const navigate = useNavigate()
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios.post(`${serverUrl}/login`, data, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((resp) => {
        if (resp.status === 200) {
          navigate("/");
        }
      })
    };
    return {handleSubmit}
}

export default LoginLogic;