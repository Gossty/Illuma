from urllib import response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .utils import *

class getAlbum(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f"albums/{id}"
        response = execute_spotify_api_request(host,endpoint, second_=True)
        title = response.get('name')
        label = response.get('label')
        image = response.get('images')[0].get('url')
        date = response.get('release_date')
        popularity = response.get('popularity')
        total_tracks = response.get('total_tracks')
        artists_array = response.get('artists')
        items = response.get('tracks').get('items')

        album_songs = []
        for i in range(len(items)):
            item = items[i]
            duration = item.get('duration_ms')
            song_id = item.get('id')

            artists_array = item.get('artists')
            song_artists = []
            for j in range(len(artists_array)):
                dum_artist = artists_array[j]
                song_artist = {
                    'artist_name': dum_artist.get('name'),
                    'artist_id': dum_artist.get('id')
                }
                song_artists.append(song_artist)    

            song = {
                'title': item.get('name'),
                'artists': song_artists,
                'duration': duration,
                'image': image,
                'id': song_id,
            }
            album_songs.append(song)

        
        
        album_artists = []
        for j in range(len(artists_array)):
            dum_artist = artists_array[j]
            song_artist = {
                'artist_name': dum_artist.get('name'),
                'artist_id': dum_artist.get('id')
            }
            album_artists.append(song_artist)   

        album = {
            'artists': album_artists,
            'title': title,
            'label': label,
            'image': image,
            'date': date,
            'popularity': popularity,
            'total_tracks': total_tracks,
            'songs': album_songs,
        }
        return Response(album, status=status.HTTP_200_OK)