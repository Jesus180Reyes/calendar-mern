import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import CalendarApi from "../apis/calendarApis";
import { ConvertsEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onLogOutCalendar, onSetActiveEvent, onUpdateEvents } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
const dispatch =  useDispatch();
const { events,activeEvent} =    useSelector(state => state.calendar);
const { user} =    useSelector(state => state.auth);
    const setActiveName = (calendarEvent)=> {
        dispatch(onSetActiveEvent(calendarEvent));
        
    }
    const startSavingEvent = async(calendarEvent)=> {

      try {
        if(calendarEvent._id){
          await CalendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
            dispatch(onUpdateEvents({...calendarEvent,user })) ;
            return;
         }
         const {data} = await CalendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({...calendarEvent,id: data.evento._id, user})); 
      } catch (error) {
          console.log(error);
          Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }
     
    }
    const startDeletingEvent = async()=> {
      try {
        await CalendarApi.delete(`/events/${activeEvent._id}`);
      } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');

        
      }
      dispatch(onDeleteEvent());
      
    }
    const startLoadingEvents = async()=> {
      try {
        const {data} = await CalendarApi.get('/events');
        const events = ConvertsEventsToDate(data.events);
        dispatch(onLoadEvents(events));
      } catch (error) {
        console.log('error cargando eventos');
        console.log(error);
      }
    }
  return {
    // * Propiedades 
    events,
    activeEvent,


    //* Metodos

    setActiveName,
    hasEventSelected: !!activeEvent,
     startDeletingEvent,
    startSavingEvent,
    startLoadingEvents
    
  }
}
