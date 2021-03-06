from django.db import models

# Create your models here.

class SpotifyToken(models.Model):
  user = models.CharField(max_length=50, unique=True)
  refresh_token = models.CharField(max_length=300)
  access_token = models.CharField(max_length=300)
  created_at = models.DateTimeField(auto_now_add=True)
  expires_in = models.DateTimeField()
  token_type = models.CharField(max_length=50)