// import React from 'react';
// import { Link } from 'react-router-dom'; // If you're using react-router for navigation

// const Navbar = () => {
//     return (
//         <nav className="flex flex-row bg-gray-300 h-28 items-center">
//             <div className='px-2 mr-auto'>
//                 <Link to="/" className='px-2'><img src='/logo.svg' alt='logo' width={200} /></Link>
//             </div>
//             <div className="links flex flex-row">
//                 <Link to="/knowledge" className='px-4 text-lg'>Knowledge Base</Link>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="flex flex-row bg-gray-300 h-16 items-center justify-between px-4">
//       <div className="flex items-center">
//         <img src="/logo.svg" alt="logo" width={100} className="mr-4" />{" "}
//         {/* Adjust logo size as needed */}
//         {/* Replace with your actual logo text or image */}
//       </div>
//       <div className="links flex">
//         {/* Dummy links */}
//         <a href="#home" className="px-4 text-lg hover:underline">
//           Home
//         </a>
//         <a href="#about" className="px-4 text-lg hover:underline">
//           About us
//         </a>
//         <a href="#projects" className="px-4 text-lg hover:underline">
//           Projects
//         </a>
//         <a href="#contact" className="px-4 text-lg hover:underline">
//           Contact us
//         </a>
//         <a href="#login" className="px-4 text-lg hover:underline">
//           Login
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-200 py-2 px-4 shadow-md">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" width="150" className="mr-10" />{" "}
      </div>
      <div className="links flex gap-8">
        {/* Dummy links */}
        <a
          href="#home"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          About us
        </a>
        <a
          href="#knowledge"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          Knowledge Base
        </a>
        <a
          href="#projects"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          Contact us
        </a>
        <a
          href="#login"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
