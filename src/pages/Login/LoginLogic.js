import axios from "axios";
import { serverUrl } from "../../config";
import { useNavigate } from "react-router-dom";

function LoginLogic(userId,setUserId){
  console.log(setUserId)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios.post(`${serverUrl}/login`, data, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((resp) => {
        if (resp.status === 200) {
          const respUserId = resp.data
          const start = Date.now()
          localStorage.setItem('userId', respUserId);
          const end = Date.now()
          console.log(end-start)
          setUserId(respUserId)
          navigate(`/users/${respUserId}`);
        }
      }).catch(e=>console.log(e.message))
    };
    return {handleSubmit}
}

export default LoginLogic;