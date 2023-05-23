import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_LARAVEL_URL + '/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'same-origin',
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      if (data.isRegistered) {
        navigate("/login")
      }
      setLoading(false);

    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div class="overflow-auto flex h-screen justify-center items-center min-h-screen bg-image-all bg-cover bg-no-repeat bg-center bg-fixed">
      {isLoggedIn ?
        <p>
          {t('signInAlreadyLoggedIn')}
        </p> :
        <div class="container h-full p-10">
          <div
            class="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div class="w-full">
              <div
                class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                <div class="g-0 lg:flex lg:flex-wrap">
                  <div class="px-4 md:px-0 lg:w-6/12">
                    <div class="md:mx-6 md:p-12">
                      <div class="text-center">
                        <img
                          class="mx-auto w-48"
                          src="LogoBuenoSNB.png"
                          alt="logo" />
                        <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold text-white">
                          {t('signInMensajeJeacs')}
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p class="mb-4 text-white">
                          {t('singInSubmitMensaje')}
                        </p>
                        <div class="border-2 border-fuchsia-600 relative mb-4 mt-10" data-te-input-wrapper-init>
                          <label
                            for="exampleFormControlInput1"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                            {t('signInUsername')}
                          </label>
                          <br></br>
                          <input
                            class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} required />

                        </div>
                        <br></br>
                        <div class="border-2 border-fuchsia-600 relative mb-4 " data-te-input-wrapper-init>
                          <label
                            for="exampleFormControlInput11"
                            class=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                            {t('signInEmail')}
                          </label>

                          <br></br>
                          <input
                            class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"></input>
                        </div>
                        <a class="text-neutral-500">
                          {t('signInEmailMustHave')}
                        </a>
                        <br></br><br></br>
                        <div class="border-2 border-fuchsia-600 relative mb-4 " data-te-input-wrapper-init>
                          <label
                            for="exampleFormControlInput11"
                            class=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                            {t('signInPassword')}
                          </label>
                          <br></br>
                          <input
                            class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                        </div>
                        <a class="text-neutral-500">
                          {t('signInPasswordMustHave')}
                        </a>
                        <br></br><br></br>

                        <div class="mb-12 pb-1 pt-1 text-center">
                          <button
                            class="bg-gradient-to-r from-violet-400 to-fuchsia-800 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit" disabled={isLoading}
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            {isLoading ? (
                              <div role="status">
                                <svg aria-hidden="true" class="inline-flex items-center w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                              </div>
                            ) : (
                              <p>
                                {t('signIn')}
                              </p>
                            )}
                          </button>

                        </div>

                        <div class="flex items-center justify-between pb-6">
                          <p class="mb-0 mr-2 text-white">
                            {t('signInAlreadyAcc')}
                          </p>
                          <NavLink to="/login">
                            <button
                              type="button"
                              class="text-white inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                              data-te-ripple-init
                              data-te-ripple-color="light">
                              {t('logIn')}
                            </button>
                          </NavLink>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="bg-gradient-to-r from-violet-400 to-fuchsia-800 flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div class="px-4 py-6 text-white md:mx-auto md:p-12">
                      <img class="m-auto text-center" src="capoo-blue-cat.gif" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Signin;