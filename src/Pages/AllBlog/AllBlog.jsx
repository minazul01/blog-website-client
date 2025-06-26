
import { useEffect, useState } from "react";
import AllBlogPost from "./AllBlogPost";
import axios from "axios";


const AllBlog = () => {
    const [post, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/post")
        .then(res => res.json())
        .then(data => setData(data))
    }, []);
   





     const [comment, setComment] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/comment").then((res) => {
      setComment(res.data);
    });
  }, []);









    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
           {
            post.map(post => <AllBlogPost key={post._id} data={post} com={comment}></AllBlogPost>)
           }
        </div>
    );
};

export default AllBlog;