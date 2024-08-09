import React, { useEffect, useState } from 'react'

function Manager() {


     const [form, setForm] = useState({ site: "", username: "", password: "" })
     const [passwordArray, setPasswordArray] = useState([])
     const [num ,setNum] = useState(true)
 
     const getPasswords =async()=>{
          let passwords = await fetch("http://localhost:3000").then((res)=>res.json())
          console.log(passwords)
          setPasswordArray(passwords)
     }

     


     const savePassword = async() => {
          let password = await fetch('http://localhost:3000/save',
               {
                    method:'POST',
                    headers:{
                         "content-type":"application/json"
                    },
                    body:JSON.stringify(form),
               }).then(response => response.json())
               .then(data => console.log(data))
               .catch(error => console.error(error));
               setNum(!num)
          }

     useEffect(() => {
          getPasswords()
              
     }, [num])

     const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value })

     }

     const copyText = (text) => {
          navigator.clipboard.writeText(text)
          alert("text copied" + text)
     }

     const editText = (site, username, password) => {
          setForm({site:site , username :username ,password:password})
          delText(username)
          console.log("sdas")
     }

     const delText = async (username) => {
          let delPass = await fetch(`http://localhost:3000/:${username}`,
               {
                    method:'DELETE'
               }).then(response => response.json())
               .then(data => console.log(data))
               .catch(error => console.error(error));
          setPasswordArray(passwordArray.filter(item => (item.username != username)))
          localStorage.setItem("password",passwordArray.filter(item => (item.username != username)))
     }


     return (
          <>
               <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="container mx-auto bg-slate-50 mycontainer ">
                    <h1 className='font-bold  text-black text-2xl'>
                         <span className="text-green-700">&lt;</span>
                         passop
                         <span className="text-green-700">/ &gt;</span>

                    </h1>
                    <p>your own password manager</p>

                    <div className="text-black gap-3 flex flex-col p-4">
                         <input id='site' name="site" value={form.site} onChange={handleChange} placeholder='enter URL' className="rounded-full border border-green-500 w-full py-1 p-4" type="text" />
                         <div className=" justify-between flex">
                              <input id='username' value={form.username} onChange={handleChange} name='username' placeholder="enter username" type="text" />
                              <input id='password' value={form.password} onChange={handleChange} name='password' placeholder="enter password" type="text" />
                         </div>
                         <button onClick={savePassword} className="flex justify-center item-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-green-900 border-1"> Add Password </button>
                    </div>
               </div>

               {passwordArray.length === 0 ? <div>No passwords to show</div> :
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                         <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                                   <tr>
                                        <th scope="col" class="px-6 w-2 py-3 bg-gray-50 dark:bg-gray-800">
                                             Product name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                             Color
                                        </th>
                                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                             Category
                                        </th>
                                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                             Actions
                                        </th>

                                   </tr>
                              </thead>
                              <tbody>
                                   {passwordArray.map((item) => {
                                        return <tr class="border-b border-gray-200 dark:border-gray-700">
                                             <th scope="row" class="px-6  overflow-hidden py-4 font-medium   text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                  <div className='flex'>
                                                       <span> {item.site}</span>
                                                       <img onClick={() => { copyText(item.site) }} className='w-5 mx-2 cursor-pointer' src="./public/copy-icon.svg" alt="" />
                                                  </div>
                                             </th>
                                             <td class="  px-6 py-4">
                                                  <div className='flex'>
                                                       <span> {item.username}</span>
                                                       <img className='w-5 mx-2 cursor-pointer' src="./public/copy-icon.svg" alt="" />
                                                  </div>
                                             </td>
                                             <td class="px-6  py-4 bg-gray-50 dark:bg-gray-800">
                                                  <div className='flex'>
                                                       <span>  {item.password}</span>
                                                       <img className='w-5 mx-2 cursor-pointer' src="./public/copy-icon.svg" alt="" />
                                                  </div>
                                             </td>
                                             <td class="px-6  py-4 bg-gray-50 dark:bg-gray-800">
                                                  <div className='flex'>
                                                       <img className='w-5 mx-2 cursor-pointer' onClick={() =>{ delText(item.username) }     } src="./public/8664938_trash_can_delete_remove_icon.svg" alt="" />
                                                       <img className='w-5 mx-2 cursor-pointer' onClick={() => { editText(item.site, item.username, item.password) }} src="./public/8666681_edit_icon (1).svg" alt="" />
                                                  </div>
                                             </td>

                                        </tr>
                                   })}

                              </tbody>
                         </table>
                    </div>
               }
          </>
     )
}

export default Manager
