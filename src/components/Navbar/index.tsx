
import React from 'react';
import Link from 'next/link';


const Navbar = () => {


    return (
        <>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart">
    
                    Cart
                    {/* {cartItemsCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {cartItemsCount}
                      </span>
                    )} */}
                </Link>
              </li>
              <li>
                <Link href="/login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </>
    );
};

export default Navbar;
