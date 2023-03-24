import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarAdminData } from './SideBarAdminData';
import { SidebarEmployeeData } from './SideBarEmployeeData';
import '../style/SideBarAdmin.css';
import authService from '../../services/auth-service';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


function SideBar() {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    authService.logout();
  }

  const [isLoading, setLoading] = useState(true); // Loading state


    useEffect(() => {

      if(authService.getCurrentUser()==undefined){
        navigate('/404');
      }else if(authService.getCurrentUser().roles.at(0) === 'ROLE_ADMIN')//maybe dodac role_employee
      {
          console.log('admin');
      }else if(authService.getCurrentUser().roles.at(0) === 'ROLE_EMPLOYEE'){
        setLoading(false);
      }
  }, []);



  return (
    <>
      <main className={show ? 'space-toggle' : null}>
        <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
          </div>
        </header>

        <aside className={`sidebar ${show ? 'show' : null}`}>
          <nav className='nav'>
            <div>
              <Link to='/system' className='nav-logo'>
                <i className={`fas fa-home-alt nav-logo-icon`}></i>
                <span className='nav-logo-name'> ANIMAL <i className="fa-solid fa-paw"></i></span>
              </Link>
              <div className='nav-list'>
               {isLoading && isLoading ? 
               SidebarAdminData.map((item) => {
                  return (
                    <>
                      <Link to={item.path} className='nav-link'>
                        {item.icon}
                        <span className='nav-link-name'>{item.title}</span>
                      </Link>
                    </>
                  );
                })   :
                 SidebarEmployeeData.map((item) => {
                  return (
                    <>
                      <Link to={item.path} className='nav-link'>
                        {item.icon}
                        <span className='nav-link-name'>{item.title}</span>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <Link to='/' className='nav-link' onClick={handleClick}>
              <i className='fas fa-sign-out nav-link-icon'></i>
              <span className='nav-link-name'>Wyloguj się</span>
            </Link>
          </nav>
        </aside>
        <ToastContainer />
      </main></>


  );
}

export default SideBar;



