import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";


export default function Header(){

  const navigate = useNavigate();    


  async function logout(){  
      localStorage.removeItem('_token');    
      navigate('/');
  }

    return (
        <header>
        <nav class="bg-gray-950 text-white border-gray-200 shadow-lg">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <Link to='/feed' class="flex items-center">        
        <span class="self-center text-lg  font-bold whitespace-nowrap dark:text-white">Desafio Pleno</span>
    </Link>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>

    
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
        <li>
          <Link to='/feed' class="block p-2 text-sm  font-semibold hover:bg-slate-300 rounded-lg " aria-current="page">Feed</Link>
        </li>
        <li>
          <Link to='/post' class="block p-2 text-sm  font-semibold hover:bg-slate-300 rounded-lg" aria-current="page">Post</Link>
        </li>
        <li>
          <span className="block p-2 text-sm  font-semibold hover:bg-slate-300 rounded-lg" onClick={() => logout()}>Sair</span>
        </li>
  
  
      </ul>
    </div>
  </div>
</nav>
        </header>
    )
}