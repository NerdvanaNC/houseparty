from django.db import models
from django.utils.crypto import get_random_string

def room_code_generator():
  return get_random_string(length=6).upper()

# Create your models here.
class Room(models.Model):
  code = models.CharField(max_length=8, default=room_code_generator, unique=True)
  host = models.CharField(max_length=50, unique=True)
  guest_can_pause = models.BooleanField(null=False, default=False)
  votes_to_skip = models.IntegerField(null=False, default=1)
  created_at = models.DateTimeField(auto_now_add=True)