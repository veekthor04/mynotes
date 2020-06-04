from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=250)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey( User, on_delete=models.CASCADE )
    def __str__(self):
        return self.title
