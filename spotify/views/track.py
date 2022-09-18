from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .utils import *

class getTrack(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f"tracks/{id}"
        response = execute_spotify_api_request(host,endpoint, second_=True)
        album = {
            'album_name': response.get('album').get('name'),
            'album_id': response.get('album').get('id'),
            'release_date': response.get('album').get('release_date')
        }

        artists_array = response.get('artists')
        song_artists = []
        for j in range(len(artists_array)):
            dum_artist = artists_array[j]
            song_artist = {
                'artist_name': dum_artist.get('name'),
                'artist_id': dum_artist.get('id')
            }
            song_artists.append(song_artist)    

        song = {
            'song_name': response.get('name'),
            'song_id': response.get('id'),
            'image': response.get('album').get('images')[0].get('url'),
            'track_number': response.get('track_number'),
            'popularity': response.get('popularity'),
            'artists': song_artists,
            'album': album,
            'duration': response.get('duration_ms')
            
        }
        return Response(song, status=status.HTTP_200_OK)

class getTrackFeatures(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f"audio-features/{id}"
        response = execute_spotify_api_request(host, endpoint, second_=True)
        return Response(response, status=status.HTTP_200_OK)
