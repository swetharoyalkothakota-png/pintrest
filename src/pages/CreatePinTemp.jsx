
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextTemp";

export default function CreatePin() {
  const { addPin } = useAppContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Nature");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addPin({
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      author: "Swetha",
      boardId: 1,
      keywords: [title.trim().toLowerCase(), category.toLowerCase()],
    });

    navigate("/");
  }

  return (
    <main className="page-container">
      <section className="home-heading">
        <h1>Create a Pin ✨</h1>
        <p>Share an idea with your collection.</p>
      </section>

      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="pin-title">Pin title</label>
        <input
          id="pin-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter pin title"
          required
        />

        <label htmlFor="pin-category">Category</label>
        <select
          id="pin-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {["Nature", "Home Decor", "Travel", "Technology"].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <label htmlFor="pin-image">Image URL</label>
        <input
          id="pin-image"
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />

        <button type="submit" className="auth-submit">Create Pin</button>
      </form>
    </main>
  );
}
