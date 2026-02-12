export const MOCK_EXERCISES = [
    { id: 1, name: "Flexiones de Pecho", description: "Ejercicio básico para fortalecer pectoral y tricéps.", video_url: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
    { id: 2, name: "Sentadillas Libres", description: "Trabajo fundamental de pierna y glúteo.", video_url: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { id: 3, name: "Zancadas Alternas", description: "Excelente para cuádriceps y equilibrio.", video_url: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { id: 4, name: "Plancha Abdominal", description: "Isométrico para fortalecer el core.", video_url: "https://www.youtube.com/watch?v=ASdVmSTG8Ew" },
    { id: 5, name: "Dominadas", description: "Ejercicio de tracción para espalda y bíceps.", video_url: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
    { id: 6, name: "Press Militar", description: "Desarrollo de hombros y estabilidad.", video_url: "https://www.youtube.com/watch?v=hzX8I4nd8F0" },
    { id: 7, name: "Bíceps con Barra", description: "Aislamiento de bíceps para hipertrofia.", video_url: "https://www.youtube.com/watch?v=ly_i7VvO9oY" },
    { id: 8, name: "Extensiones de Tríceps", description: "Trabajo de la cabeza larga del tríceps.", video_url: "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q" },
];

export const MOCK_ROUTINES = [
    {
        id: 1,
        date: new Date().toISOString().split('T')[0],
        notes: "Entrenamiento de fuerza enfocado en empuje.",
        exercises: [
            { id: 1, sets: 4, reps: "12", exercise_details: MOCK_EXERCISES[0] },
            { id: 2, sets: 4, reps: "15", exercise_details: MOCK_EXERCISES[1] },
            { id: 3, sets: 3, reps: "10", exercise_details: MOCK_EXERCISES[5] },
        ]
    },
    {
        id: 2,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        notes: "Día de tracción y core.",
        exercises: [
            { id: 4, sets: 3, reps: "60 seg", exercise_details: MOCK_EXERCISES[3] },
            { id: 5, sets: 4, reps: "Max", exercise_details: MOCK_EXERCISES[4] },
            { id: 6, sets: 3, reps: "12", exercise_details: MOCK_EXERCISES[6] },
        ]
    }
];

export const MOCK_USER = {
    username: "demo_user",
    first_name: "Usuario",
    last_name: "Demo",
    is_trainer: false
};
