import axios from "axios";
import { useEffect, useState } from "react";
import { GiPlayButton } from "react-icons/gi";

const CommentInput = () => {
    const [comment, setComment] = useState("");
    const handleComment = e => {
        e.preventDefault();
        const comment = e.target.comment.value;
       
        axios.post("http://localhost:5000/comment", {comment: comment})
        .then(res => console.log(res.data))
       
    }
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
