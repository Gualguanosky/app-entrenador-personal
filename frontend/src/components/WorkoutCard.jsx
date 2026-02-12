import React from 'react';

const WorkoutCard = ({ day, routine, isToday }) => {
    return (
        <div className={`p-4 rounded-xl shadow-lg border-2 transition-all duration-300 ${isToday
                ? 'border-blue-500 bg-blue-50 transform scale-105 z-10'
                : 'border-transparent bg-white hover:border-blue-200'
            }`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-bold ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
                    {day.name}
                </h3>
                <span className={`text-sm px-2 py-1 rounded-full ${isToday ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                    {day.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                </span>
            </div>

            {routine ? (
                <div>
                    <p className="text-sm text-gray-600 mb-3 italic">"{routine.notes || 'Sin notas adicionales'}"</p>
                    <div className="space-y-3">
                        {routine.exercises.map((item) => (
                            <div key={item.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="font-semibold text-gray-800">{item.exercise_details.name}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                                        {item.sets} x {item.reps}
                                    </span>
                                    {item.exercise_details.video_url && (
                                        <a
                                            href={item.exercise_details.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                            </svg>
                                            Video
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-400 text-sm">Descanso</p>
                </div>
            )}
        </div>
    );
};

export default WorkoutCard;
