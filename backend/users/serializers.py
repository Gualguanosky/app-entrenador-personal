from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_trainer', 'phone_number', 'subscription_end_date', 'profile_picture']
        read_only_fields = ['is_trainer', 'subscription_end_date'] 
