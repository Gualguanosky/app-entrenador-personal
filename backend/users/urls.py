from django.urls import path
from .views import ClientListView, MyProfileView

urlpatterns = [
    path('clients/', ClientListView.as_view(), name='client-list'),
    path('profile/', MyProfileView.as_view(), name='my-profile'),
]
