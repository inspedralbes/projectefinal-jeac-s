import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actions } from '../components/store.js';

function GetRanking() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(process.env.REACT_APP_LARAVEL_URL + '/api/getRanking', {
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

  function visitarPerfil(id){
    dispatch(actions.getUserId({id: id, visitor: true, tab:"tab1"}));
    navigate("/otherProfile")
  }

  return (
    <div class="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center">
      <div class="container h-full w-full md:w-full lg:w-2/4 lg:p-5 ">
        <div class="block rounded-lg bg-gray-800 border-violet-300 shadow-lg dark:bg-neutral-800">
          <div class="border-violet-300 border p-4">
            <div class="md:m-6 md:p-12">
              <div class="text-center">
                <h1 class="text-white text-2xl font-bold">
                  {t('ranking')}
                </h1>
                <br></br>
                {isLoading ? (
                  <p class="text-white">
                    {t('loading')}
                  </p>
                ) : (
                  <div>
                    <table class="text-xl border-separate w-fill text-sm text-left text-violet-100 dark:text-violet-100">
                      <thead class="text-center text-x text-white uppercase bg-violet-600 dark:text-white">
                        <tr>
                          <th>
                            {t('rankingPos')}
                          </th>
                          <th>
                            {t('rankingPlayer')}
                          </th>
                          <th>
                            {t('rankingPScore')}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        {users.map((user, index) => (
                          <tr class="bg-violet-500 border-b border-violet-400" key={user.id}>
                            <td class=" w-1/3 px-6 py-4 font-medium text-violet-50 whitespace-nowrap dark:text-violet-100" >
                              {index < 3 ? (
                                index === 0 ? (
                                  <img src="oro.png" alt="oro" class="mx-auto w-1/2" />
                                ) : index === 1 ? (
                                  <img src="plata.png" alt="plata" class="mx-auto w-1/2" />
                                ) : (
                                  <img src="bronce.png" alt="gold" class="mx-auto w-1/2" />
                                )
                              ) : (
                                index + 1
                              )}
                            </td>
                            <td class="w-1/3 text-white hover:text-sky-400" onClick={() => visitarPerfil(user.id)}><a class = "text-white hover:text-sky-400 cursor-pointer">{user.name}</a></td>
                            <td class="w-1/3" >{user.totalScore}</td>
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
