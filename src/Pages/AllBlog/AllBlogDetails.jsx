import { Link, useLoaderData } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";

const AllBlogDetails = () => {
  const data = useLoaderData();

  const { _id, category, description, image, title } = data;

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
    <div className="flex flex-col items-center my-20">
      <div className="card bg-base-100 lg:w-[800px] h-fit shadow-sm  rounded-2xl">
        <div className="card-body">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold  mb-5 px-5" px5>
              {category}
            </h1>
            <Link>
              <button className="text-3xl rounded-2xl cursor-pointer text-gray-400 ">
                <IoMdHeart />
              </button>
            </Link>
          </div>
          <h2 className="card-title px-5 font-bold">{title}</h2>
          <p className="px-5">{description}</p>
          <figure className="flex flex-col max-w-full max-h-full items-start m-3">
            <img className="p-2 rounded-2xl" src={image} alt="post" />
          </figure>
          <div className="flex justify-between px-5">
            <p>{likeCount ? likeCount : ""}</p>
            <p>comment</p>
          </div>
          <hr />
          <div className="card-actions justify-between px-3">
            <Link>
              <button
                onClick={handleLike}
                className={
                  like
                    ? "text-3xl rounded-2xl cursor-pointer text-green-600"
                    : "text-3xl rounded-2xl cursor-pointer text-gray-400"
                }
              >
                <AiFillLike />
              </button>
            </Link>
            <Link>
              <button className="text-3xl p-2 rounded-2xl cursor-pointer">
                <GoComment />
              </button>
            </Link>

            <Link>
              <button className="text-3xl p-2 rounded-2xl cursor-pointer">
                <PiShareFatThin />
              </button>
            </Link>
          </div>
          <div>
            <CommentInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogDetails;
