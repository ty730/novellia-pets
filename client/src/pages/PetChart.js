import "../App.css";

import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import Vaccines from "../components/Vaccines";
import Allergies from "../components/Allergies";

function PetChart() {
    const [loaded, setLoaded] = useState(false);
    const [pet, setPet] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const loadPet = async () => {
            await fetch(`http://localhost:3000/api/pet/${id}`, {
              method: "GET",
            })
              .then((res) => res.json())
              .then((res) => {
                setPet(res);
                setLoaded(true);
              })
              .catch((err) => {
                console.log(err);
              });
        }
        loadPet();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return date.toLocaleDateString(undefined, options);
    };
    return (
      <div className="chart-container">
        { loaded &&
        <div>
            <div>
                <div className="title">
                Medical Records
                </div>
                <p>Name: <span>{pet.name}</span></p>
                <p>Type: <span>{pet.type}</span></p>
                <p>Owner: <span>{pet.owner_name}</span></p>
                <p>Date of Birth: <span>{formatDate(pet.dob)}</span></p>
            </div>
            <div className="records-container">
                <Vaccines petId={id} />
                <Allergies petId={id} />
            </div>
            
        </div>
        }
      </div>
    );
}

export default PetChart;