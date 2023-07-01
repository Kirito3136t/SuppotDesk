import React from 'react'
import { useState,useEffect } from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

import {toast} from 'react-toastify'

function Login() {

    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })

    const {email,password,} = formData

    const dispatch = useDispatch()

    const navigate=useNavigate()

    const {user,isError,isLoading,message,isSuccess} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
            }

        if(isSuccess && user){
            navigate('/')
        }

        dispatch(reset())
    },[isError,isSuccess,message,navigate,user])


const onChange=(e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}    

const onSubmit=(e)=>{
    e.preventDefault()

    const userData={
        email,password
    }
    dispatch(login(userData))

}

if(isLoading){
    return <Spinner/>
}

  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Please login to get support</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                type='email'
                className='form-control'
                name='email'
                value={email}
                id='email'
                placeholder='Enter your email'
                onChange={onChange}
                required
                />
            </div>
            <div className="form-group">
                <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                id='password'
                placeholder='Enter password'
                onChange={onChange}
                required
                />
            </div>
            <div className="form-control">
                <button className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
    </>
    
  )
}

export default Login