import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecetteList = ({ setUserId }) => {
  const [recettes, setRecettes] = useState([]);
  const API_BASE_URL = 'http://localhost:5000/recettes'; // Update with your API endpoint

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setRecettes(response.data);
      } catch (error) {
        console.error('Error fetching recettes:', error);
      }
    };

    fetchRecettes();
  }, []);

  const handleSelectRecette = (recetteId) => {
    // Implement the logic to navigate to the details page
    // You can use React Router or any other navigation library for this purpose
  };

  return (
    <div className="recette-list-container">
      <h2>Recettes</h2>
      <table className="recette-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {recettes.map((recette) => (
            <tr key={recette._id} className="recette-row">
              <td>{recette.nom}</td>
              <td>{recette.dureePreparation} minutes</td>
              <td>
                <button
                  className="recette-details-button"
                  onClick={() => handleSelectRecette(recette._id)}
                >
                  Details
                </button>
                {/* Add more buttons for other operations */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecetteList;
