import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import WorkoutCard from '../components/WorkoutCard';

const ClientDashboard = () => {
    let { user, logoutUser } = useContext(AuthContext);
    let [routines, setRoutines] = useState([]);
    let [weekDays, setWeekDays] = useState([]);
    let [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        getDailyRoutines();
        generateWeekDays(currentDate);
    }, [currentDate])

    const generateWeekDays = (date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        startOfWeek.setDate(diff);

        const days = [];
        const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        for (let i = 0; i < 7; i++) {
            const current = new Date(startOfWeek);
            current.setDate(startOfWeek.getDate() + i);
            days.push({
                name: dayNames[i],
                date: current,
                dateString: current.toISOString().split('T')[0]
            });
        }
        setWeekDays(days);
    }

    let getDailyRoutines = async () => {
        try {
            let response = await api.get('workouts/routines/');
            if (response.status === 200) {
                setRoutines(response.data);
            }
        } catch (error) {
            console.error("Error fetching routines", error);
        }
    }

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }

    const changeWeek = (offset) => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + offset * 7);
        setCurrentDate(nextDate);
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <nav className="bg-white shadow-sm mb-8">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user?.username ? user.username[0].toUpperCase() : 'U'}
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">Hola, {user?.first_name || user?.username || 'Usuario'}</h1>
                    </div>
                    <button onClick={logoutUser} className="text-gray-600 hover:text-red-500 transition-colors font-medium">Cerrar Sesión</button>
                </div>
            </nav>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Tu Plan Semanal</h2>
                    <div className="flex items-center bg-white rounded-lg shadow-sm border p-1">
                        <button onClick={() => changeWeek(-1)} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <span className="px-4 font-semibold text-gray-700 min-w-32 text-center">
                            Semana del {weekDays[0]?.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        </span>
                        <button onClick={() => changeWeek(1)} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {weekDays.map((day) => {
                        const routine = routines.find(r => r.date === day.dateString);
                        return (
                            <WorkoutCard
                                key={day.dateString}
                                day={day}
                                routine={routine}
                                isToday={isToday(day.date)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default ClientDashboard;
