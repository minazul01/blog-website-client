import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";
import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import CommentInput from "./AllBlog/CommentInput";

const AllBlogDetails = () => {
  
  const { id } = useParams();
  const singleData = useLoaderData();
  const [data, setData] = useState(singleData);
  const [commentData, setCommentData] = useState([]);
  const [click, setClick] = useState(false);

  const { _id, category, description, image, title } = data;

  // navigate delete to navigate
  const navigate = useNavigate();

  // comment real time add on the blog post
  const getComment = () => {
    axios
      .get(`http://localhost:5000/comment/${id}`)
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  };
  useEffect(() => {
    getComment();
  }, [id]);

  // blog post like click to add local store
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

  // delete the post
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/favorite/${id}`)
          .then((res) => {
            
            if (res.data.acknowledged == true) {
              Swal.fire({
                title: "Delete!",
                text: "Your file has been Delete.",
                icon: "success",
              });
              navigate("/features_blogs");
            }
          })
          .catch((err) => {
            if (err) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
            }
          });
      }
    });
  };
  return (
    <div className="flex flex-col items-center my-20">
      <div className="card bg-base-100 lg:w-[800px] h-fit shadow-sm  rounded-2xl">
        <div className="card-body">
          <div className="flex justify-between">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className=" text-4xl font-bold  mb-5 px-5">{category}</h2>
              <div className="relative inline-block">
                <h2
                  className="text-3xl font-bold pr-5 cursor-pointer"
                  onClick={() => setClick(!click)}
                >
                  <BsThreeDots />
                </h2>

                {click && (
                  <div className="absolute right-0 mt-2 bg-gray-200 border shadow p-2 rounded space-y-2 z-10">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="block w-full text-lg hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
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
            <div>
              {commentData.map(({ _id, comment, name, image }) => (
                <div key={_id} className="my-3">
                  <div className="flex flex-row items-start gap-2">
                    <div>
                      <img
                        className="w-[35px] h-[35px] rounded-full object-cover"
                        src={image}
                        alt="user"
                      />
                    </div>
                    <div className="p-2 bg-gray-200 rounded-md">
                      <h5 className="text-xl font-bold">{name}</h5>
                      <p className="text-lg font-normal">{comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CommentInput postId={_id} getComment={getComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogDetails;
