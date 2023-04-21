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
              
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <img class="block h-8 w-auto lg:hidden" src="LogoLargo.png" alt="Your Company"></img>
                <img class="hidden h-8 w-auto lg:block" src="LogoLargo.png" alt="Your Company"></img>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">

                  <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>

                  <NavLink to="/game">
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">BallGame</a>
                  </NavLink>                  

                  {isLoggedIn ?
                    (
                      <NavLink to="/store">
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
                    <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" data-dropdown-toggle="dropdown">
                      <span class="sr-only">Open user menu</span>
                      
                    </button> 
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