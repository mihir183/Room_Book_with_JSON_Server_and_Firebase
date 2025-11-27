import { lazy } from "react";
const Home = lazy(()=> import('./pages/Home'))
const Login = lazy(()=> import('./pages/Login'))
const BookRoom = lazy(()=> import('./pages/BookRoomForm'))
const Error = lazy(()=> import('./pages/Error'))
const Admin = lazy(()=>import('./pages/Admin'))

const Routing = [
    {
        path : '/',
        element : Login
    },
    {
        path : '/home',
        element : Home
    },
    {
        path : '/bookRoom',
        element : BookRoom
    },
    {
        path : '/updateBook/:id',
        element : BookRoom
    },
    {
        path : '/admin',
        element : Admin
    },
    {
        path : '*',
        element : Error
    },
]

export default Routing