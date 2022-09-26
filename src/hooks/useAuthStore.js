import { useDispatch, useSelector } from "react-redux"
import CalendarApi from "../apis/calendarApis";
import { checking, clearErrorMessage, onLogin, onLogout } from "../store/auth/AuthSlice";
import { onLogOutCalendar } from "../store/calendar/calendarSlice";


export const useAuthStore = () => {
    const { status,user, errorMsg } = useSelector(state =>  state.auth);
    const dispatch = useDispatch();

    const startLogin =async ({email,password})=> {
        console.log({email,password});    
        dispatch(checking());
        try {
            const {data} = await CalendarApi.post('/auth',{email,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name:data.usuario.nombre, uid: data.usuario.uid}));
            console.log(data);

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);


        }
    }

    const  checkAuthToken = async()=> {
        const token = localStorage.getItem('token');
        if(!token){
            return dispatch(onLogout());
        }
        try {
            const{ data} = await CalendarApi.get('auth/renew');
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid:data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
            
        }
    }

    const startRegister =async ({email,nombre,password,})=> {
        dispatch(checking());
        try {
            const {data} = await CalendarApi.post('/usuarios',{email,nombre,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name:data.usuario.nombre, uid: data.usuario.uid}));
            console.log(data);

        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);


        }
    }

    const startLogOut = ()=> {
        localStorage.clear();
        dispatch(onLogOutCalendar());
        dispatch(onLogout());
    }


    return {
        //* Propiedades
        status,
        user,
        errorMsg,
        
        
        //* Metodos
        checkAuthToken,
        startLogin,
        startLogOut,
        startRegister,
    }
}