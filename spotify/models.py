from django.db import models
from django.db.models import JSONField

# Create your models here.

class topSongs(models.Model):
    last_updated = models.DateTimeField(auto_now=True)
    def songs_default():
        return 1
    top_songs = JSONField("TopSongs", default=dict)


class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=1000)
    access_token = models.CharField(max_length=1000)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
    top_songs = models.ForeignKey(topSongs, on_delete=models.CASCADE, db_index=True)