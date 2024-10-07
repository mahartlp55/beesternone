import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const OutletComponent = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};
export default OutletComponent;
