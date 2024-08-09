import React from 'react'

function Navbar() {
  return (
    <nav className="
    flex justify-around items-center h-20 px-4">
      <div className="mycontainer">
     <div className="logo font-bold  text-[#171717] text-2xl">
     <span className="text-green-700">&lt;</span>
      passop
      <span className="text-green-700">/ &gt;</span>
      </div>
     <ul >
          <li className='flex gap-4'>
               <a href="" className='hover:font-bold'>Home</a>
               <a href="" className='hover:font-bold'>about</a>
               <a href="" className='hover:font-bold'>contact</a>
               
          </li>
     </ul>
     </div>
    </nav>
  )
}

export default Navbar
