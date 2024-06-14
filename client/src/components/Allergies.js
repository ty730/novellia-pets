import "../App.css";

import { useState } from "react";

function Allergies({ petId }) {
    const [allergyName, setAllergyName] = useState("");
    const [allergyReact, setAllergyReact] = useState("");
    const [allergySeverity, setAllergySeverity] = useState("");
    const [allergies, setAllergies] = useState([]);

    const handleAllergySubmit = async (e) => {
      e.preventDefault();
      if (allergyName && allergyReact && allergySeverity) {
        const newAllergy = {
            "name": allergyName,
            "reaction": allergyReact,
            "severity": allergySeverity,
            "petId": petId
        };
        fetch("http://localhost:3000/api/allergy", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAllergy)
        })
        .then((res) => {
            setAllergies(prevAllergies => [newAllergy, ...prevAllergies])
            setAllergyName("");
            setAllergyReact("");
            setAllergySeverity("");
        })
        .catch((err) => console.log(err));
      }
    };

    return (
        <div>
            <div
            style={{ fontSize: "24px", fontWeight: "500", padding: "10px 5px" }}
            >
            Allergies
            </div>
            <div className="form-container">
                <form className="allergy-form" onSubmit={handleAllergySubmit}>
                    <input
                        type="text"
                        value={allergyName}
                        placeholder="Name"
                        onChange={(e) => setAllergyName(e.target.value)}
                    />
                    <input
                        type="allergyReact"
                        value={allergyReact}
                        placeholder="Reaction"
                        onChange={(e) => setAllergyReact(e.target.value)}
                    />
                    <input
                        type="text"
                        value={allergySeverity}
                        placeholder="Severity"
                        onChange={(e) => setAllergySeverity(e.target.value)}
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
            {allergies.length > 0 &&
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
                <th style={{ textAlign: "left", padding: "15px 15px", width: "102px" }}>Reaction</th>
                <th style={{ textAlign: "left", padding: "15px 15px", width: "100px" }}>Severity</th>
            </tr>

            {allergies.map((allergy, index) => (
                <tr key={index} style={{}}>
                    <td
                        style={{
                        textAlign: "left",
                        padding: "15px 15px",
                        backgroundColor: "white",
                        }}
                    >
                        {allergy.name}
                    </td>
                    <td
                        style={{
                        textAlign: "left",
                        padding: "15px 15px",
                        backgroundColor: "white",
                        }}
                    >
                        {allergy.reaction}
                    </td>
                    <td
                        style={{
                        textAlign: "left",
                        padding: "15px 15px",
                        backgroundColor: "white",
                        }}
                    >
                        {allergy.severity}
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
            }
        </div>
    );
}

export default Allergies;