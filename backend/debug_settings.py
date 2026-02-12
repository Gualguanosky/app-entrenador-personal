import os
import sys
import django
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainer_project.settings")
django.setup()

print(f"ROOT_URLCONF: {settings.ROOT_URLCONF}")

try:
    from django.urls import get_resolver
    resolver = get_resolver()
    print(f"URL Patterns: {resolver.url_patterns}")
except Exception as e:
    print(f"Error resolving URLs: {e}")
