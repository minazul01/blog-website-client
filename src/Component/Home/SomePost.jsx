import axios from "axios";
import { useEffect, useState } from "react";
import SomePostBlog from "./SomePostBlog";


const SomePost = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://blog-website-server-ochre.vercel.app/post")
        .then(res => {
           setData(res.data.slice(15,21));
        })
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
           {
            data.map(da => <SomePostBlog key={da._id} data={da} />)
           }
        </div>
    );
};

export default SomePost;