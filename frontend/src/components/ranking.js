import React, { useState, useEffect } from 'react';

function GetRanking() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8000/api/getRanking', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p className="ranking_font_size">Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="ranking_font_size">#</th>
              <th className="ranking_font_size">Name</th>
              <th className="ranking_font_size">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="ranking_font_size">{index + 1}</td>
                <td className="ranking_font_size">{user.name}</td>
                <td className="ranking_font_size">{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetRanking;
