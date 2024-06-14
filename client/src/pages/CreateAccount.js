import "../App.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [owner, setOwner] = useState("");
    const [dob, setDob] = useState(new Date());

    const navigate = useNavigate();
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      if (name && type && owner && dob) {
          fetch("http://localhost:3000/api/pet", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "name": name,
              "type": type,
              "ownerName": owner,
              "dob": dob
            })
          })
          .then((res) => res.json())
          .then((res) => {
            navigate("/chart/" + res.id);
          })
          .catch((err) => console.log(err));
      }
    };
  
    return (
      <div className="create-container">
        <div
          style={{ fontSize: "24px", fontWeight: "500", padding: "10px 5px" }}
        >
          Create Pet Account
        </div>
        <form className="create-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={type}
            placeholder="Animal Type"
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="text"
            value={owner}
            placeholder="Owner's Name"
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
          />
  
          <button type="submit">Create</button>
        </form>
      </div>
    );
}

export default CreateAccount;
