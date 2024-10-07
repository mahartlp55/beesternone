import React from 'react';
import { CiBitcoin } from 'react-icons/ci';
import { FaCoins } from 'react-icons/fa6';
import { FaUserGroup } from 'react-icons/fa6';
import { GiMiner } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <header className='h-[83px] w-full bg-[#0c0c1d] text-white flex justify-evenly items-center fixed bottom-0'>
        <nav>
          <ul className='flex gap-7'>
            <li>
              <Link to='/home' className='text-gray-400'>
                <FaHome className='m-auto text-2xl' /> Home
              </Link>
            </li>
            <li>
              <Link to='/reward' className='text-gray-400'>
                <GiMiner className='m-auto text-2xl' /> Mine
              </Link>
            </li>
            <li>
              <Link to='/friends' className='text-gray-400'>
                <FaUserGroup className='m-auto text-2xl' /> Friends
              </Link>
            </li>
            <li>
              <Link to='/soon' className='text-gray-400'>
                <FaCoins className='m-auto text-2xl' /> Earn
              </Link>
            </li>
            <li>
              <Link to='/soon '>
                <CiBitcoin className='m-auto text-2xl bg-[#e9a830] rounded-full' />{' '}
                AirDrop
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
