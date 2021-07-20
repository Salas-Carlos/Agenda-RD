import {React, useState} from 'react'
import {useSelector} from 'react-redux'
import Modal from 'react-modal';
import '../../styles.css'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { uiCloseModal } from '../../actions/ui';
import { eventAddnew } from '../../actions/eventos';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

  const now = moment().minutes(0).seconds(0).add(1,'hours'); 

  const endDate = now.clone().add(1, 'hours'); 
export const CalendarioModal = () => {
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui)
    const [dateStart, setdateStart] = useState(now.toDate())
    const [dateEnd, setdateEnd] = useState(endDate.toDate())
    const [titleValid, settitleValid] = useState(true)

    
    const [formValues, setformValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: endDate.toDate()
    })

    const {notes, title, start, end} = formValues;

    const handleStartDateChange =(e) =>{
        setdateStart(e);
        setformValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setdateEnd(e)
        setformValues({
            ...formValues,
            end: e
        })
    }

    const closeModal =() => {
        dispatch(uiCloseModal())
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault()
        console.log(formValues);

        const momentStart = moment(start);
        const momentEnd = moment(end);
        if(momentStart.isSameOrAfter(momentEnd)){
            Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio')
        }
        if(title.trim().length < 2){
            settitleValid(false)

        }
        
        dispatch(eventAddnew({
            ...formValues,
            id:new Date().getTime(),
            user:{
                _id: "123",
                name: "Carlos"
            }
        }));
        settitleValid(true);

        closeModal();
    }

    const handleInputChange =({target})=>{
        setformValues({
            ...formValues,
            [target.name]:target.value
        })
    }
    

    return (
        <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
          <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={handleSubmitForm}>

    <div className="form-group">
    <label>Fecha y hora inicio</label>
    <br/>
    <DateTimePicker
        onChange={handleStartDateChange}
        minDate = {now.toDate()}
        value={dateStart}
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <br/>
        <DateTimePicker
        onChange={handleEndDateChange}
        minDate = {dateStart}
        value={dateEnd}
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
      </Modal>
    )
}