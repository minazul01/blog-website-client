import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import CommentInput from "./CommentInput";
import axios from "axios";
import Swal from "sweetalert2";

const AllBlogDetails = () => {
  const [favourite, setFavourite] = useState([]);
  const { id } = useParams();
  const singleData = useLoaderData();
  const [data, setData] = useState(singleData);
  const [commentData, setCommentData] = useState([]);
  const { _id, category, description, image, title } = data;
  const [click, setClick] = useState(false);

  // favourite post added
  const handleFavourite = (data) => {
    const exists = favourite.find((fav) => fav._id === data._id);
    if (exists) {
      Swal.fire("Already in Favourite!");
    } else {
      setFavourite([...favourite, data]);
      Swal.fire("Added to Favourite!");
    }
  };

  const exists = favourite.find((fav) => fav._id === data._id);

  const dataWithoutId = favourite.map(({ _id, ...rest }) => rest);

  useEffect(() => {
    if (favourite.length > 0) {
      const dataWithoutId = favourite.map(({ _id, ...rest }) => rest);

      axios
        .post("https://blog-website-server-ochre.vercel.app/favorite", dataWithoutId)
        .then((res) => {
          if (res.acknowledged && res.insertedCount > 0) {
            Swal.fire({
              title: "Favorite added!",
              text: "Your file has been Added.",
              icon: "success",
            });
          }
        });
    }
  }, []);

  // navigate delete to navigate
  const navigate = useNavigate();

  // comment real time add on the blog post
  const getComment = () => {
    axios
      .get(`https://blog-website-server-ochre.vercel.app/comment/${id}`)
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
          .delete(`https://blog-website-server-ochre.vercel.app/post/${id}`)
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Delete!",
                text: "Your file has been Delete.",
                icon: "success",
              });
              navigate("/all_blogs");
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
              <h2 className="text-4xl font-bold  mb-5 px-5">{category}</h2>
              <div className="relative inline-block">
                <h2
                  className="text-3xl font-bold pr-5 cursor-pointer"
                  onClick={() => setClick(!click)}
                >
                  <BsThreeDots />
                </h2>

                {click && (
                  <div className="absolute right-0 mt-2 bg-gray-200 border shadow p-2 rounded space-y-2 z-10">
                    <Link
                      to={`/update_post/${_id}`}
                      className="block w-full text-lg hover:text-blue-500"
                    >
                      Update
                    </Link>
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
            <Link>
              <button
                onClick={() => handleFavourite(data)}
                className={`text-3xl rounded-2xl cursor-pointer ${
                  exists
                    ? "text-red-500 hover:text-gray-200 transition"
                    : "text-gray-400 hover:text-red-500 transition"
                }`}
              >
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
