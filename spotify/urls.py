from django.urls import path

from .views.track import *
from .views.views import *
from .views.album import *
from .views.artist import *
from .views.topCharts import *
from .views.likedSongs import *
from .views.playlist import *

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('recently-played', recentlyPlayed.as_view()),
    path('top-tracks/<str:term>', topTracks.as_view()),
    path('top-artists/<str:term>', topArtists.as_view()),
    path('get-playlists', getPlaylists.as_view()),
    path('current-song', currentSong.as_view()),
    path('get-artist/<str:id>', getArtist.as_view()),
    path('get-liked-songs', getLikedSongs.as_view()),
    path('artist-top-tracks/<str:id>', artistTopTracks.as_view()),
    path('artist-albums/<str:id>', artistAlbums.as_view()),
    path('related-artists/<str:id>', relatedArtists.as_view()),
    path('get-user', getUser.as_view()),
    path('get-track/<str:id>', getTrack.as_view()),
    path('get-track-features/<str:id>', getTrackFeatures.as_view()),
    path('search/<str:query>', search.as_view()),
    path('check-liked/<str:id>', checkLiked.as_view()),
    path('get-details', getDetails.as_view()),
    path('get-album/<str:id>', getAlbum.as_view()),
    path('get-playlist/<str:id>', getPlaylist.as_view()),
    path('create-playlist', createPlaylist.as_view())
]
