import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [pets, setPets] = useState([{}]);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = () => {
    fetch("http://localhost:3000/api/pet", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setPets(res);
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <div
          style={{ fontSize: "24px", fontWeight: "500", padding: "10px 5px" }}
        >
          Dashboard
        </div>
        <table
          style={{
            borderCollapse: "separate",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #e2e2e2",
          }}
        >
          <tbody>
          <tr
            style={{
              backgroundColor: "#f6f6f6",
            }}
          >
            <th
              style={{
                textAlign: "left",
                padding: "15px 15px",
              }}
            >
              ID
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "15px 15px",
              }}
            >
              Name
            </th>
            <th style={{ textAlign: "left", padding: "15px 15px" }}>Type</th>
            <th style={{ textAlign: "left", padding: "15px 15px" }}>
              Date of Birth
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "15px 15px",
              }}
            >
              Owner Name
            </th>
          </tr>

          {pets.map((pet, index) => (
            <tr key={index} style={{}}>
              <td
                style={{
                  textAlign: "left",
                  padding: "15px 15px",
                  backgroundColor: "white",
                }}
              >
                {pet.id}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "15px 15px",
                  backgroundColor: "white",
                }}
              >
                {pet.name}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "15px 15px",
                  backgroundColor: "white",
                }}
              >
                {pet.type}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "15px 15px",
                  backgroundColor: "white",
                }}
              >
                {formatDate(pet.dob)}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "15px 15px",
                  backgroundColor: "white",
                }}
              >
                {pet.owner_name}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
