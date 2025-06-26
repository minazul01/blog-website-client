import { useLoaderData } from "react-router-dom";
import FavoritePost from "./FavoritePost";


const FeaturesBlog = () => {
  const data = useLoaderData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
      {data.map((post) => (
        <FavoritePost key={post._id} data={post} ></FavoritePost>
      ))}
    </div>
  );
};

export default FeaturesBlog;
