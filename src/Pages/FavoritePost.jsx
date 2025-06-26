import { Link, useLoaderData } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";



const FavoritePost = ({ data }) => {
    
  const { _id, description, image, title } = data;



  //  localhost like
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const savedLiked = localStorage.getItem(`liked_${_id}`) === "true";
    const savedCount = parseInt(localStorage.getItem(`likeCount_${_id}`)) || 0;
    setLike(savedLiked);
    setLikeCount(savedCount);
  }, [_id]);

  const handleLike = () => {
    const newLiked = !like;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLike(newLiked);
    setLikeCount(newCount);

    localStorage.setItem(`liked_${_id}`, newLiked);
    localStorage.setItem(`likeCount_${_id}`, newCount);
  };
  return (
    <div>
      <div className="card bg-base-100 max-w-full max-h-[450px] shadow-sm p-4 rounded-2xl">
        <figure className="max-w-90 mx-auto h-[300px]">
          <img className="p-2 rounded-2xl" src={image} alt="post" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <hr />
          <div className=" flex justify-between items-center">
            <div>
              <Link>
                <button
                  onClick={handleLike}
                  className={
                    like
                      ? "text-3xl rounded-2xl cursor-pointer text-[#0566FF]"
                      : "text-3xl rounded-2xl cursor-pointer text-gray-400 hover:text-[#0566FF]"
                  }
                >
                  <AiFillLike />
                </button>
              </Link>
              <p>{likeCount ? <span>{likeCount}</span> : ""}</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Link to={`/favorite/${_id}`}>
                <GoComment className="text-4xl p-2 rounded-2xl cursor-pointer hover:text-blue-500" />
              </Link>
              {/* Jodi comment thake tahole length dekhabo */}
              {/* {matchedComments.length > 0 && <p>{matchedComments.length}</p>} */}
            </div>

            <div>
              <Link to={`/favorite/${_id}`}
                className="bg-lime-300 hover:bg-lime-500 cursor-pointer py-1 px-3 rounded-xl text-base font-bold badge-outline mt-5"
                
              >
                <button>Details</button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePost;
