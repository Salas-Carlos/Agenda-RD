import React from 'react'
import {Navbar} from '../../ui/navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles.css'
import { messages } from '../../helpers/calendar-messages'
import {calendarEvent} from './calendarEvent'
import {useState} from 'react'
import { useDispatch } from "react-redux";
import {CalendarioModal} from './CalendarioModal'
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/eventos';
import { AddNewFab} from '../../ui/AddNewFab'
import {useSelector} from 'react-redux'

moment.locale('es');

const localizer = momentLocalizer(moment);
/*
const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes:'Comprar pastel',
    user: {
        _id: '123',
        name: 'Carlos'
    }
}]*/

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.calendar)

    const [lastView, setlastView] = useState(localStorage.getItem('lastView')|| 'month');

    
    const onDoubleClick = (e) =>{
        dispatch(uiOpenModal());
    }
    const onSelectevent = (e) =>{
        dispatch(eventSetActive(e))
        dispatch(uiOpenModal());
    }

    const onViewChange = (e)=>{
        setlastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event,start,end, isSelected)=>{

        
        //console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '10px',
            opacity: 0.8,
            display: 'block',
            color:'white'
        }
        return {
            style
        }
    };

    return (
        
        <div className="calendar-screen">
        
        
            <Navbar/>

            <Calendar
            messages= {messages}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectevent}
            onView={onViewChange}
            view= {lastView}
            components={{
                event: calendarEvent
            }}
            />

        <AddNewFab/>
        <CalendarioModal/>
        </div>
        
        
    )
}
