from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated')
    pass
