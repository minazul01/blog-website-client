
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const navigate = useNavigate();
  const data = useLoaderData();
  const [updateData, setUpdateData] = useState(data);
  const handleUpdatePost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/post/${updateData._id}`, objectData)
        .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire("Saved!", "", "success");
            }
        })
        navigate("/all_blogs");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white mt-10  p-5 shadow rounded-md my-20">
      <h2 className="text-2xl font-bold text-center mb-10">Create New Blog</h2>
      <form onSubmit={handleUpdatePost} className="space-y-12">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          defaultValue={updateData.title}
          placeholder="Enter Title"
          className="w-full border p-2 rounded"
          required
        />

        {/* Category Select */}
        <select className="w-full border p-2 rounded" name="category" defaultValue={updateData.category} required>
          <option value="">Select Category</option>
          <option value="Programming">Programming</option>
          <option value="Technology">Technology</option>
          <option value="AI">AI</option>
          <option value="Web Development">Web Development</option>
        </select>

        {/* Description Input */}
        <textarea
          placeholder="Enter Description"
          className="w-full border p-2 rounded"
          name="description"
          defaultValue={updateData.description}
          required
        ></textarea>

        {/* Image URL Input */}
        <input
          type="text"
          placeholder="Enter Image URL"
          className="w-full border p-2 rounded"
          name="image"
          defaultValue={updateData.image}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
