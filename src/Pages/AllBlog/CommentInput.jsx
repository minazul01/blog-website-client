import axios from "axios";
import {  use, useContext, useState } from "react";
import { GiPlayButton } from "react-icons/gi";
import Swal from "sweetalert2";
import { context } from "../../Layout/Authentication/NewProvider";

const CommentInput = ({postId, getComment}) => {
  const {user} = useContext(context);
 
  const [comment, setComment] = useState("");
  const handleComment = (e) => {
    e.preventDefault();
    let commentInput = e.target.comment.value;
    setComment(commentInput);
    axios.post("https://blog-website-server-ochre.vercel.app/comment", { comment: comment, postId: postId, name: user.displayName, image: user.photoURL }).then((res) => {
      if (res.data.acknowledged) {
       
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Comment has been added.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Clear input field
        setComment('');
        getComment();
    });
  };
  return (
    <div>
      <div className="relative w-full">
        <form onSubmit={handleComment}>
          <textarea
            name="comment"
            placeholder="Write Your Comment!!"
            className="border-border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border outline-none px-4 w-full min-h-[100px] bg-gray-200 rounded-xl py-3 focus:border-gray-400 transition-colors duration-300"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            disabled={comment.trim() === ""}
            type="submit"
            className={`absolute bottom-2 right-2 text-3xl cursor-pointer  rounded-md transition ${
              comment.trim() === ""
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            <GiPlayButton />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentInput;
