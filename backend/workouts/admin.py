from django.contrib import admin
from .models import Exercise, DailyRoutine, RoutineExercise

class RoutineExerciseInline(admin.TabularInline):
    model = RoutineExercise
    extra = 1

@admin.register(DailyRoutine)
class DailyRoutineAdmin(admin.ModelAdmin):
    inlines = [RoutineExerciseInline]
    list_display = ['client', 'date', 'assigned_by']
    list_filter = ['date', 'client']

admin.site.register(Exercise)
