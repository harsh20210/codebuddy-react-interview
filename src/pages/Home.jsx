import { useNavigate } from "react-router-dom";
import Settper from "../Components/Stepper";

const Home = () => {
  const navigate = useNavigate();
  
  const handleClickEventForPost = () => {
    navigate("/posts")
  }

  return (
    <>
    <div className="flex justify-end mb-5">
    <button className="postButton" onClick={handleClickEventForPost}>see Post</button>
    </div>
    <Settper/>
    </>
  );
};

export default Home;
