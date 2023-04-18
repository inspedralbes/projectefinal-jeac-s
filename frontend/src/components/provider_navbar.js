import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';

function Navbar() {

  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  function logout() {
    dispatch(actions.logout());
    localStorage.setItem('access_token', "0");
  }


  return (
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <img class="block h-8 w-auto lg:hidden" src="jeacsLogo.PNG" alt="Your Company"></img>
                <img class="hidden h-8 w-auto lg:block" src="jeacsLogo.PNG" alt="Your Company"></img>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">

                  <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>

                  <NavLink to="/games">
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Games</a>
                  </NavLink>

                  <NavLink to="/game">
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">BallGame</a>
                  </NavLink>

                  <NavLink to="/ranking">
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Ranking</a>
                  </NavLink>

                  {isLoggedIn ?
                    (
                      <NavLink to="/gameStore">
                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Game Store</a>
                      </NavLink>
                    )
                    : null
                  }

                  {isLoggedIn ?
                    (
                      <NavLink to="/upload">
                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Upload</a>
                      </NavLink>
                    )
                    : null
                  }

                </div>
              </div>
            </div>
            {isLoggedIn ?
              (<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div class="relative ml-3">
                  <div>
                    <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full" src="pf3.PNG" alt=""></img>
                    </button>
                  </div>


                  <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                    <NavLink to="/profile">
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                    </NavLink>
                    <NavLink to="/">
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={() => logout()}>Sign out</a>
                    </NavLink>
                  </div>

                </div>
              </div>)
              : <div className="navbar-nav ml-auto">
                <NavLink to="/signin">
                  <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Sign In</a>
                </NavLink>

                <NavLink to="/login">
                  <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Log In</a>
                </NavLink>
              </div>
            }
          </div>
        </div>

      </nav>
      
  )
}

export default Navbar;