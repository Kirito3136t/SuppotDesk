import React from 'react'
import Modal from 'react-modal'
import { useSelector,useDispatch } from 'react-redux'
import { getTicket,closeTicket } from '../features/auth/tickets/ticketSlice'
import { getNotes,createNotes,reset as notesReset } from '../features/auth/notes/noteSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams,useNavigate } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'
import { useEffect,useState } from 'react';
import {toast} from 'react-toastify'
import NoteItem from '../components/NoteItem'

const customStyle={
    content:{
        width:'600px',
        top:'50%',
        left:'50%',
        right:'auto',
        marginRight:'-50%',
        bottom:'auto',
        transform:'traslate(-50%,-50%)',
        position:'relative'
    },
}

Modal.setAppElement('#root')
function Ticket() {
    const[modalisOpen,setModalIsOpen]=useState(false)
    const[noteText,setNoteText]=useState('')

    const {ticket,isLoading,isSuccess,isError,message} = useSelector((state)=>state.ticket)
    const {notes,isLoading:notesisLoading} = useSelector((state)=>state.notes)
    
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        //eslint-disabled-next-line
    },[isError,message,ticketId])

    const onTicketClosed=()=>{
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    const openModal=()=>setModalIsOpen(true)
    const closeModal=()=>setModalIsOpen(false)

    if(isLoading || notesisLoading){
        return <Spinner/>
    }

    const onNoteSubmit=(e)=>{
        e.preventDefault()
        dispatch(createNotes({noteText,ticketId}))
        closeModal()
        
    }

    if(isError){
        return <h3>Something went wrong ... </h3>
    }
  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Ticket ID : {ticket._id}
            </h2>
            <span className={`status status-${ticket.status}`}>
                {ticket.status}
            </span>
            <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-IN')}</h3>
            <h3>Product : {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
        
        </header>

        {ticket.status !== 'closed' && (
            <button onClick={openModal} className='btn'><FaPlus/>Add Note</button>
        )}

        {notes.map((note)=>(
            <NoteItem key={note._id} note={note}/>
        ))}

        <Modal isOpen={modalisOpen} onRequestClose={closeModal} style={customStyle} contentLabel='Add Note'>
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea placeholder='Please add a note' value={noteText} name="noteText" id="noteText"  onChange={(e)=>setNoteText(e.target.value)} className='form-control'>
                    </textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type='submit'>Submit</button>
                </div>
            </form>
        </Modal>

        {ticket.status !== 'closed' && (
            <button className="btn btn-block btn-danger" onClick={onTicketClosed}>Close Ticket</button>
        ) }
    </div>
  )
}

export default Ticket