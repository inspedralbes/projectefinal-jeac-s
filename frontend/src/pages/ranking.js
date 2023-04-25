import React, { useState, useEffect } from 'react';
import routes from '../index.js';

function GetRanking() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(routes.fetchLaravel + '/api/getRanking', {
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
    <div class="bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center">
      <div class="container h-full w-2/4 p-10">
        <div class=" block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
          <div class="p-4">
            <div class="md:m-6 md:p-12">
              <div class="text-center">
                <h1 class = "text-white text-xl font-bold">RANKING</h1>
                <br></br>
                {isLoading ? (
                  <p class = "text-white" className="ranking_font_size">Loading...</p>
                ) : (
                  <div>
                  <table class="overflow-scroll rounded-lg border-separate w-full text-sm text-left text-violet-100 dark:text-violet-100">
                    <thead class = "text-x text-white uppercase bg-violet-600 dark:text-white">
                      <tr>
                        <th className="ranking_font_size">Position</th>
                        <th className="ranking_font_size">Name</th>
                        <th className="ranking_font_size">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr class="bg-violet-500 border-b border-violet-400" key={user.id}>
                          <td class=" w-1/3 px-6 py-4 font-medium text-violet-50 whitespace-nowrap dark:text-violet-100" className="ranking_font_size">
                            {index < 3 ? (
                              index === 0 ? (
                                <img src="oro.png" alt="oro" class="w-20" />
                              ) : index === 1 ? (
                                <img src="plata.png" alt="plata" class="w-20" />
                              ) : (
                                <img src="bronce.png" alt="gold" class="w-20" />
                              )
                            ) : (
                              index + 1
                            )}
                          </td>
                          <td class = "w-1/3" className="ranking_font_size">{user.name}</td>
                          <td class = "w-1/3" className="ranking_font_size">{user.totalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetRanking;
