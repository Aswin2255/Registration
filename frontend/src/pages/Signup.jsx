import React from 'react'
import { useState } from 'react'
import { useReducer } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import instance from '../Axios'
import Cards from '../components/Cards'

function Signup() {
    const [emailvalid,setemailvalid] = useState(true)
    const [usernamevalid,setusernamevalid] = useState(true)
    const [phonevalid,setphonevalid] = useState(true)
    const [passvalid,setpassvalid] = useState(true)
    const [splvalid,setsplvalid] = useState(true)
    const [numbervalid,setnumbervalid] = useState(true)
    const[lwruprvalid,setlwrupr] = useState(true)
    const[showpass,setshowpass] = useState(false)
    const initialstate = {
        username:'',
        email:'',
        pass:'',
        phone:'',
    }
    const reducer = (state,action)=>{
        switch (action.type) {
            case 'handelinput':
                return {
                    ...state,
                    [action.field]:action.payload
                }
              
          
                
            default:
                return state
        }
    }
    const generateerror = (err)=>{
        toast.error(err,{
          position:"top-center"
        })
      }
      const generatesucess = (err)=>{
        toast.success(err,{
          position:"top-center"
        })
      }
    const handlechange = (e)=>{
        dispatch({
            type:'handelinput',
             field:e.target.name,
             payload:e.target.value
        })

    }
    const submit = async ()=>{
        if(formstate.username&&formstate.email&&formstate.pass){
            let emailcheck = formstate.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            setemailvalid(emailcheck)
            let usernamecheck = formstate.username.match(/^[a-zA-Z-]+$/);
            setusernamevalid(usernamecheck)
            let phonecheck = formstate.phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
            setphonevalid(phonecheck)
            let passcheck = formstate.pass.length>=8
            setpassvalid(passcheck)
            let specialcheck =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(formstate.pass)
            setsplvalid(specialcheck)
            let numericcheck = /\d/.test(formstate.pass)
            setnumbervalid(numericcheck)
            let lowerupercheck = formstate.pass.match(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
            setlwrupr(lowerupercheck)
            if(emailcheck&&usernamecheck&&phonecheck&&passcheck&&specialcheck&&numericcheck&&lowerupercheck){
              const {data} = await  instance.post('/register',formstate,{withCredentials:true})
              if(data.status){
               
                generatesucess(data.message)
              
              

              }
              else{
                generateerror(data.message)
              }
               
            }

        }
        else{
            generateerror('all fields required')
        }
        
    }
    const[formstate,dispatch] = useReducer(reducer,initialstate)
    
  return (
    <div className='h-screen flex items-center'>
    <div className='max-w-md mx-auto grow '>
      
   
        <Cards>
        <h1 className='text-5xl mb-4  text-gray-400  text-center justify-center '>Signup</h1>
        <div>
            <input  className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  placeholder='Enter the Name' value={formstate.name} name = 'username' onChange={(e)=>handlechange(e)}  type='text'></input>    
            {
                  !usernamevalid   ?  <label className='text-red-700'>Invalid username</label> : ''
                }
                
            </div>
            <div >
              
            <input  className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  placeholder='Enter the email' value={formstate.email} name = 'email' onChange={(e)=>handlechange(e)}   type='text'></input>
          
            {
                  !emailvalid   ?  <label className='text-red-700'>Invalid email address</label> : ''
                }
            </div>
            <div>
            <input className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the phonenumber' value={formstate.cpass} name = 'phone' onChange={(e)=>handlechange(e)}   type='number'></input>
            {
                  !phonevalid   ?  <label className='text-red-700'>Invalid phone number</label> : ''
                }
            </div>
            <div className='relative'>
            <input className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the password' value={formstate.password} name = 'pass' onChange={(e)=>handlechange(e)}   type={showpass?'text':'password'}></input>
            <button onClick={()=>{setshowpass(!showpass)}} className='absolute  inset-y-0 right-0 pr-3 top-5 flex hover:underline hover:text-blue-700 '>{showpass?'Hide':'Show'}</button>
           <div>
           {
                  !passvalid   ?  <label className='text-red-700 m-2'> * password is less than 8 characters</label> : ''
                }
             
            </div>
            <div>
            {
                  !splvalid   ?  <label className='text-red-700 m-2'> * password must contain 1 spl character</label> : ''
                }

            </div>
            <div>
            {
                  !numbervalid   ?  <label className='text-red-700 m-2'> * password must contain 1 number</label> : ''
                }

            </div>
            <div>
            {
                  !lwruprvalid   ?  <label className='text-red-700 m-2'> * contain atleast one lover case and upper case</label> : ''
                }

            </div>
                
                
               
            </div>
           
            <div className='flex gap-4 items-center justify-center m-4'>
            <button className='bg-socialblue text-white px-6 py-1 rounded-md' onClick={submit}>Signup</button>
            </div>
           
            
        </Cards>
        <ToastContainer/>
    </div>
  
</div>
  )
}

export default Signup
