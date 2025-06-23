import React from 'react';
import { Container, Logo, LogoutBtn, ProfileBtn, ThemeBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
    
  ];

  return (
    <div className="w-full mx-auto mb-10 bg-gray-900 text-white shadow-md z-50 rounded-2xl shadow-lg dark:bg-gray-800">
      <header className="py-4">
        <Container>
          <nav className="flex items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Logo" width="40" height= "40" className="object-cover rounded-full border-2 border-gray-300 shadow-md"/>
            </div>

            {/* Navigation Links */}
            <ul className="flex items-center space-x-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-4 py-2 text-white hover:bg-blue-600 hover:text-white rounded-lg transition duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-6">
              {authStatus && <LogoutBtn />}
              <ThemeBtn />
              {authStatus && <ProfileBtn />}
            </div>
          </nav>
        </Container>
      </header>
    </div>
  );
}

export default Header;