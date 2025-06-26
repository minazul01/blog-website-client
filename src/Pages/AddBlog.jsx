import axios from "axios";
import Swal from "sweetalert2";

const AddBlog = () => {
  const handleAddBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Post it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/post", objectData)
          .then((res) => {
            
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Posted!",
                text: "Your file has been posted.",
                icon: "success",
              });
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
    <div className="max-w-4xl mx-auto bg-white mt-10  p-5 shadow rounded-md my-20">
      <h2 className="text-2xl font-bold text-center mb-10">Create New Blog</h2>
      <form onSubmit={handleAddBlog} className="space-y-12">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="w-full border p-2 rounded"
          required
        />

        {/* Category Select */}
        <select className="w-full border p-2 rounded" name="category" required>
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
          required
        ></textarea>

        {/* Image URL Input */}
        <input
          type="text"
          placeholder="Enter Image URL"
          className="w-full border p-2 rounded"
          name="image"
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

export default AddBlog;
