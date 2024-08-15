import React from 'react';
import Link from 'next/link';
import CartIcon from '../Cart/CartIcon';
import Image from 'next/image';
import Search from '../Search';

const Navbar: React.FC = () => {
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
            <Link href="/login">Login</Link>
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
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/cart">
            <CartIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;