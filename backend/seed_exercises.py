import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainer_project.settings")
django.setup()

from workouts.models import Exercise

exercises_data = [
    ("Flexiones de Pecho", "Ejercicio básico para fortalecer pectoral y tricéps.", "https://www.youtube.com/watch?v=IODxDxX7oi4"),
    ("Sentadillas Libres", "Trabajo fundamental de pierna y glúteo.", "https://www.youtube.com/watch?v=aclHkVaku9U"),
    ("Zancadas Alternas", "Excelente para cuádriceps y equilibrio.", "https://www.youtube.com/watch?v=aclHkVaku9U"),
    ("Plancha Abdominal", "Isométrico para fortalecer el core.", "https://www.youtube.com/watch?v=ASdVmSTG8Ew"),
    ("Dominadas", "Ejercicio de tracción para espalda y bíceps.", "https://www.youtube.com/watch?v=eGo4IYlbE5g"),
    ("Press Militar con Mancuernas", "Desarrollo de hombros y estabilidad.", "https://www.youtube.com/watch?v=hzX8I4nd8F0"),
    ("Bíceps con Barra", "Aislamiento de bíceps para hipertrofia.", "https://www.youtube.com/watch?v=ly_i7VvO9oY"),
    ("Extensiones de Tríceps", "Trabajo de la cabeza larga del tríceps.", "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q"),
    ("Peso Muerto Rumano", "Enfoque en isquiotibiales y zona lumbar.", "https://www.youtube.com/watch?v=JCXUYuzwvgQ"),
    ("Burpees", "Ejercicio cardiovascular de alta intensidad.", "https://www.youtube.com/watch?v=dZgVxmf6jkA"),
    ("Mountain Climbers", "Core y cardio combinado.", "https://www.youtube.com/watch?v=zT-9L37ReNc"),
    ("Jumping Jacks", "Calentamiento aeróbico clásico.", "https://www.youtube.com/watch?v=2W4ZNSwoW_4"),
    ("Abdominales de Bicicleta", "Trabajo intenso de los oblicuos.", "https://www.youtube.com/watch?v=wqoD0Bd_xM4"),
    ("Hip-Thrust", "El mejor ejercicio para aislamiento de glúteo.", "https://www.youtube.com/watch?v=LM8LG_trstE"),
    ("Remo con Mancuerna", "Desarrollo de la amplitud de la espalda.", "https://www.youtube.com/watch?v=dFzUjzu1m-4"),
    ("Aperturas de Pecho", "Aislamiento pectoral con mancuernas.", "https://www.youtube.com/watch?v=A_T_XfF_fA4"),
    ("Elevaciones Laterales", "Para un hombro con aspecto redondeado.", "https://www.youtube.com/watch?v=uK8Kvw_I-2o"),
    ("Fondos en Paralelas", "Potencia para tríceps y pecho bajo.", "https://www.youtube.com/watch?v=jWvxoG78-cE"),
    ("Zancada lateral", "Enfoque en aductores y glúteo medio.", "https://www.youtube.com/watch?v=2C-uNgKwPLE"),
    ("Press de Banca", "El rey de los ejercicios de empuje para tren superior.", "https://www.youtube.com/watch?v=gRVjAtPip0Y")
]

def seed_exercises():
    for name, desc, url in exercises_data:
        Exercise.objects.get_or_create(
            name=name,
            defaults={'description': desc, 'video_url': url}
        )
    print(f"Successfully created/verified {len(exercises_data)} exercises.")

if __name__ == "__main__":
    seed_exercises()
