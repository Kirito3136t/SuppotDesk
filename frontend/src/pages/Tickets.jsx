import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getTickets,reset } from '../features/auth/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TicketItem from '../components/TicketItem'
import BackButton from '../components/BackButton'


function Tickets() {
     
    const {tickets,isLoading,isSuccess,isError,message} = useSelector((state)=>state.ticket)

    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
        return ()=>{
            if(isSuccess){
                dispatch(reset())
            }
        }
    },[isSuccess,dispatch,reset])

    useEffect(()=>{
        dispatch(getTickets())
    },[dispatch])


    

    if(isLoading){
        return <Spinner/>
    }

  return (
    <>
    <BackButton url='/'/>
    <h1>Tickets</h1>
    <div className='tickets'>
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map((ticket)=>(
            <TicketItem key={ticket._id} ticket={ticket}/>
        ))}

    </div>
    </>
  )
}

export default Tickets