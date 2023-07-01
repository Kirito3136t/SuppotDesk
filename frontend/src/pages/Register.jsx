import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { register,reset } from '../features/auth/authSlice'


function Register() {

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email,password,password2} = formData

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user,isError,isLoading,message,isSuccess} =useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
            }

        if(isSuccess && user){
            navigate('/')
            toast.success('User created')
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
    
    if (password !== password2){
        toast.error('Password do not match')
    }else{
       const userData={
        name,email,password,password2
       }

       dispatch(register(userData))
    }
}

if(isLoading){
    return <Spinner/>
}

  return (
    


    <>
    <section className="heading">
        <h1>
            <FaUser/> Register
        </h1>
        <p>Please create an account</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                type='text'
                className='form-control'
                name='name'
                value={name}
                id='name'
                placeholder='Enter your name'
                onChange={onChange}
                required
                />
            </div>
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
            <div className="form-group">
                <input
                type='password'
                className='form-control'
                name='password2'
                value={password2}
                id='password2'
                placeholder='Confirm password'
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

export default Register