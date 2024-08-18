// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import CartIcon from '../Cart/CartIcon';
import Image from 'next/image';
import Search from '../Search';
import LoginModal from '../Auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearUser } from '@/store/authSlice';


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="flex flex-col mobile:flex-row justify-between items-center p-5 space-y-4 mobile:space-y-0">
      <div className="flex justify-between items-center w-full mobile:w-auto">
        <Link href="/" passHref>
          <Image
            src="/duggup_logo.jpeg"
            alt="DuggUp Logo"
            width={40}
            height={40}
            className="h-10 w-10 cursor-pointer"
          />
        </Link>
        <ul className="flex space-x-6 items-center mobile:hidden">
          <li>
            <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
          </li>
          <li>
            <Link href="/cart">
              <CartIcon />
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full mobile:w-2/4 mobile:mx-4">
        <Search />
      </div>
      <ul className="hidden mobile:flex space-x-6 items-center">
        {user ? (
          <>
            <li>Welcome, {user.firstname}</li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
          </li>
        )}
        <li>
          <Link href="/cart">
            <CartIcon />
          </Link>
        </li>
      </ul>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};

export default Navbar;