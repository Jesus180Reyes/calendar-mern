import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"

export const AppRouter = () => {

    // const authStatus = 'not-Authenticated';// 'authenticated';  // "not-Authenticated"
    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();


    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-Authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to={"/auth/login"} />} />
                        </>
                    )
                    :
                    (
                        <>
                            < Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to={"/"} />} />

                        </>
                    )
            }



        </Routes>
    )
}
