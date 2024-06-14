import "../App.css";

import { useState } from "react";

function Vaccines({ petId }) {
    const [vaccName, setVaccName] = useState("");
    const [vaccDate, setVaccDate] = useState(new Date());
    const [vaccines, setVaccines] = useState([]);

    let handleVaccineSubmit = async (e) => {
      e.preventDefault();
      if (vaccName && vaccDate) {
          const newVacc = {
            "name": vaccName,
            "administered": vaccDate,
            "petId": petId
          }
          fetch("http://localhost:3000/api/vaccine", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVacc)
        })
        .then((res) => {
            setVaccines(prevVacc => [newVacc, ...prevVacc])
            setVaccName("");
            setVaccDate("");
        })
        .catch((err) => console.log(err));
      }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return date.toLocaleDateString(undefined, options);
    };
    return (
        <div>
            <div
            style={{ fontSize: "24px", fontWeight: "500", padding: "10px 5px" }}
            >
            Vaccines
            </div>
            <div className="form-container">
                <form className="vaccine-form" onSubmit={handleVaccineSubmit}>
                <input
                    type="text"
                    value={vaccName}
                    placeholder="Name"
                    onChange={(e) => setVaccName(e.target.value)}
                />
                <input
                    type="date"
                    value={vaccDate}
                    placeholder="Date Administered"
                    onChange={(e) => setVaccDate(e.target.value)}
                />
                <button 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                    height: "40px",
                    width: "40px",
                    marginRight: "10px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                type="submit">Add</button>
                </form>
            </div>
            {vaccines.length > 0 &&
            <table
            style={{
                borderCollapse: "separate",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #e2e2e2",
            }}
            >
            <tbody>
            <tr style={{ backgroundColor: "#f6f6f6",}}>
                <th style={{ textAlign: "left", padding: "15px 15px", width: "100px"}}>Name</th>
                <th style={{ textAlign: "left", padding: "15px 15px" }}>Administered</th>
            </tr>

            {vaccines.map((vacc, index) => (
                <tr key={index} style={{}}>
                    <td
                        style={{
                        textAlign: "left",
                        padding: "15px 15px",
                        backgroundColor: "white",
                        }}
                    >
                        {vacc.name}
                    </td>
                    <td
                        style={{
                        textAlign: "left",
                        padding: "15px 15px",
                        backgroundColor: "white",
                        }}
                    >
                        {formatDate(vacc.administered)}
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
            }
        </div>
    );
}

export default Vaccines;