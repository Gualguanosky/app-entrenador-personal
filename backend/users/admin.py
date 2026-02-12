from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_trainer', 'phone_number']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number', 'is_trainer', 'subscription_end_date', 'profile_picture')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number', 'is_trainer', 'subscription_end_date', 'profile_picture')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
