import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
name: 'calendar',
initialState: {
    isLoading: true,
    events:[],
    activeEvent:null,

},
reducers: {
    onSetActiveEvent:(state,{payload}) => {
        state.activeEvent = payload;
    },
    onAddNewEvent: (state,{payload})=> {
       state.events.push(payload);
       state.activeEvent = null;
    },
    onUpdateEvent: (state,{payload})=> {
      state.events = state.events.map(event => {
        if(event._id === payload.id){
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state)=> {
      if(!state.activeEvent)return ;
      state.events = state.events.filter(event => {
        return event._id !== state.activeEvent._id
      });
      state.activeEvent = null;
    },
    onLoadEvents: (state,{payload = []})=> {
      state.isLoading = false,
      // state.events = payload
      payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent.id === event);
        if(!exist){
          state.events.push(event);
        }
      });
    },
    onLogOutCalendar: (state, {payload})=> {
      state.isLoading = true,
      state.events = [],
      state.activeEvent = null
    },
}
});
export const { onSetActiveEvent ,onAddNewEvent, onUpdateEvents,onDeleteEvent,onLoadEvents,onLogOutCalendar} = calendarSlice.actions;