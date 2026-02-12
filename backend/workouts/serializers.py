from rest_framework import serializers
from .models import Exercise, DailyRoutine, RoutineExercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class RoutineExerciseSerializer(serializers.ModelSerializer):
    exercise_details = ExerciseSerializer(source='exercise', read_only=True)
    exercise_id = serializers.PrimaryKeyRelatedField(
        queryset=Exercise.objects.all(), source='exercise', write_only=True
    )

    class Meta:
        model = RoutineExercise
        fields = ['id', 'exercise_details', 'exercise_id', 'sets', 'reps', 'instructions']

class DailyRoutineSerializer(serializers.ModelSerializer):
    exercises = RoutineExerciseSerializer(many=True, read_only=True)
    
    class Meta:
        model = DailyRoutine
        fields = ['id', 'client', 'date', 'assigned_by', 'notes', 'exercises']
