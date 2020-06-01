from django.db import models
from django.utils import timezone

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=250)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
