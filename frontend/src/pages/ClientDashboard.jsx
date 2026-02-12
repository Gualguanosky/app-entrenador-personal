import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

const ClientDashboard = () => {
    let { user, logoutUser } = useContext(AuthContext);
    let [routines, setRoutines] = useState([]);

    useEffect(() => {
        getDailyRoutines();
    }, [])

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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
                <button onClick={logoutUser} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Your Routines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.map(routine => (
                    <div key={routine.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">{routine.date}</h3>
                        <p className="text-gray-700 mb-4">{routine.notes}</p>
                        <h4 className="font-semibold mt-2">Exercises:</h4>
                        <ul className="list-disc list-inside">
                            {routine.exercises && routine.exercises.map(item => (
                                <li key={item.id}>
                                    {item.exercise_details.name} - {item.sets} sets x {item.reps}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientDashboard;
