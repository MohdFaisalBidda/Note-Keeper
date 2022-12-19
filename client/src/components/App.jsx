import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [notes, setNotes] = useState([]);


  const allData = async () => {
    const response = await Axios.get("http://localhost:3002/");
    // console.log(response)
    setNotes(response.data);
  }

  useEffect(() => {
    setInterval(()=>allData(),500) 
  }, [])

  const deleteNote = async (id) => {
    console.log(id);
    const response = await Axios.delete(`http://localhost:3002/${id}`);
    // await allData();
    if (response) {
      toast.success("Successfully Deleted the Note");
      

    }
    setNotes(notes=>notes.filter(todo=>todo._id !== response._id))
    // console.error();
    console.log(response);


  }

  return (
    <div>

      <Header label={"note"} symbol={'📒'} />
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
      <CreateArea  />
      {notes?.map((data) => {
        return (
          <Note
            key={data._id}
            id={data._id}
            title={data.title}
            content={data.content}
            label={"delete"}
            symbol={""}
            onDelete={deleteNote}
          />
        )
      })}
      <Footer />
    </div>
  );
}

export default App;
