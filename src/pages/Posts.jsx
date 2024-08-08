import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../Components/Post";

const Posts = () => {

  const [data , setData] = useState([]);

   const fetchTheData = async () => {
    try {
      const response = await fetch(`https://codebuddy.review/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setData(data.data)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Something went wrong`,
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
     fetchTheData()
  },[])

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>
      <div className="container" >
      {data?.map( (value) => {
        return <Post key={value.id}  data={value}/>
      } )}
      </div>
    </div>
  );
};

export default Posts;
