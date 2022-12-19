import React, { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';



function CreateArea() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [open, setOpen] = useState(false);


  const submitNote = async (event) => {
    event.preventDefault();
    if (title !== "" && content !== "") {
      const response = await axios.post("http://localhost:3002/", { title: title, content: content });
      if (response) {
        toast.success("Inserted the note successfully");
      }
      console.log(response);
    } else {
      toast.error("Please fill the entries!");
    }
   
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          onClick={() => setOpen(true)}
          value={title}
          placeholder="Title"
        />
        {open && <textarea
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Take a note..."
          rows="3"
        />}
        <button onClick={submitNote}>ADD</button>
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '8px',
            color: '#713200',
          },
        }}
      />
    </div>
  );
}

export default CreateArea;
