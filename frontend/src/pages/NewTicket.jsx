import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { createTicket,reset } from '../features/auth/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


function NewTicket() {
    const {user} =useSelector((state)=>state.auth)
    const {isLoading,isError,isSuccess,message}= useSelector((state)=>state.ticket)

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    },[isError,message,navigate,isSuccess,dispatch])
    


    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(createTicket({product,description}))
    }

    if(isLoading){
        return <Spinner/>
    }

    return (
    <>
    <BackButton url='/'/>
    <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
    </section>
    <section className="form">
        <div className='form-group'>
            <label htmlFor="name">Customer Name</label>
            <input type='text' className='form-control' value={name} disabled/>
        </div>
        <div className='form-group'>
            <label htmlFor="name">Customer Email</label>
            <input type='text' className='form-control' value={email} disabled/>
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="product" className="form-control">
                    <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
                        <option value='iphone'>iPhone</option>
                        <option value='iMac'>iMac</option>
                        <option value='MacBook'>Macbook</option>
                        <option value='iPad'>iPad</option>
                    </select>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-control">Description of the issue</label>
                <textarea name="description" id="description" className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <button className="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default NewTicket