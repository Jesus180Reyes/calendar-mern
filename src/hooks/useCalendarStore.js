import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvents } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
const dispatch =     useDispatch();
const { events,activeEvent} =    useSelector(state => state.calendar);
    const setActiveName = (calendarEvent)=> {
        dispatch(onSetActiveEvent(calendarEvent));
        
    }
    const startSavingEvent = async(calendarEvent)=> {
      if(calendarEvent._id){
        return dispatch(onUpdateEvents({...calendarEvent})) ;
      }
         dispatch( onAddNewEvent({...calendarEvent,_id: new Date().getTime( )})); 
    }
    const startDeletingEvent = ()=> {
      dispatch(onDeleteEvent());
    }
  return {
    // * Propiedades 
    events,
    activeEvent,
    // Metodos
    setActiveName,
    hasEventSelected: !!activeEvent,
     startDeletingEvent,
    startSavingEvent
    // *
    
  }
}
