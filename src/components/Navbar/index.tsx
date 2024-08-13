import React from 'react';
import Link from 'next/link';
import CartIcon from '../Cart/CartIcon';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5">
      <div className="flex items-center">
        <Image
          src="/duggup_logo.jpeg"
          alt="DuggUp Logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
      </div>
      <ul className="flex space-x-6 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/cart">
            <CartIcon />
          </Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
