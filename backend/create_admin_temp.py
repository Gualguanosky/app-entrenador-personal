import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainer_project.settings")
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
password = 'admin123'
email = 'admin@example.com'

try:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"Superuser '{username}' created with password '{password}'")
    else:
        u = User.objects.get(username=username)
        u.set_password(password)
        u.save()
        print(f"Superuser '{username}' already exists. Password reset to '{password}'")
except Exception as e:
    print(f"Error: {e}")
