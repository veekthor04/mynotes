from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    # post views
    path('', views.note_list, name='note_list'),
]
