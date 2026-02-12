from django.db import models
from django.conf import settings

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    video_file = models.FileField(upload_to='exercise_videos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class DailyRoutine(models.Model):
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='routines')
    date = models.DateField()
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='assigned_routines')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.client.username} - {self.date}"

class RoutineExercise(models.Model):
    routine = models.ForeignKey(DailyRoutine, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.IntegerField()
    reps = models.CharField(max_length=50)
    instructions = models.TextField(blank=True)

    def __str__(self):
        return f"{self.exercise.name} for {self.routine}"
