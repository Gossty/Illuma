from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('',index, name=""),
    path('dashboard', index),
    path('artist/<str:artistId>', index),
    path('album/<str:albumId>', index),
    path('track/<str:trackId>', index),
    path('charts', index),
    path('search', index),
    path('statistics', index),
    path('playlist/<str:playlistId>', index),
    path('navigation', index)
]
