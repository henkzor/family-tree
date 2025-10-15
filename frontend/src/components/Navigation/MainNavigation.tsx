import { NavLink } from 'react-router-dom';


function MainNavigation() {
  return (
    <header className='flex justify-center py-4 mb-5 bg-stone-200' >
      <nav>
        <ul className='flex gap-6' >
          <li >
            <NavLink to="/" end className='p-2 hover:text-amber-600  rounded-md hover:underline  aria-[current=page]:text-amber-600'>
              Hem
            </NavLink>
          </li>
          <li className=''>
            <NavLink to="/trees" className='p-2 hover:text-amber-600  rounded-md hover:underline  aria-[current=page]:text-amber-600'>
              Träd
            </NavLink>
          </li>
        </ul>
      </nav>
 
    </header>

  );
}

export default MainNavigation;