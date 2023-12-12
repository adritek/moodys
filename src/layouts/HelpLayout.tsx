import { NavLink, Outlet } from 'react-router-dom';

export default function HelpLayout() {
  return (
    <div className='help-layout'>
      <nav>
        <NavLink to='faq'>FAQ</NavLink>
        <NavLink to='contact'>Contact</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
