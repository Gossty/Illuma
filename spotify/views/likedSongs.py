from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .utils import *

class getLikedSongs(APIView):
    def get(self,request,format=None):
        songs = []
        host = self.request.session.session_key
        endpoint = 'tracks/?limit=50'
        response = execute_spotify_api_request(host,endpoint)
        endpoint = response.get('next')
        token = get_user_tokens(host).access_token
        headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + token}
        counter = 0
        items = response.get('items')

        if endpoint is None:
            for i in range(len(items)):
                item = items[i]
                added_at = item.get('added_at')
                track = item.get('track')
                duration = track.get('duration_ms')
                album = {
                'album_name': track.get('album').get('name'),
                'release_date': track.get('album').get('release_date'),
                'id': track.get('album').get('id'),
                }
                album_cover = ""
                if len(track.get('album').get('images')):
                    album_cover = track.get('album').get('images')[0].get('url')
                song_id = track.get('id')
                artists_array = track.get('artists')
                song_artists = []
                for j in range(len(artists_array)):
                    dum_artist = artists_array[j]
                    song_artist = {
                        'artist_name': dum_artist.get('name'),
                        'artist_id': dum_artist.get('id')
                    }
                    song_artists.append(song_artist)   

                song = {
                    'title': track.get('name'),
                    'album': album,
                    'duration': duration,
                    'artists': song_artists,
                    'image': album_cover,
                    'id': song_id,
                    'added_at': added_at
                }
                songs.append(song)

        while endpoint is not None:
            counter += 50
            if isinstance(response, type(None)):
                break
            items = response.get('items')
            for i in range(len(items)):
                item = items[i]
                added_at = item.get('added_at')
                track = item.get('track')
                duration = track.get('duration_ms')
                album = {
                'album_name': track.get('album').get('name'),
                'release_date': track.get('album').get('release_date'),
                'id': track.get('album').get('id'),
                }
                album_cover = ""
                if len(track.get('album').get('images')):
                    album_cover = track.get('album').get('images')[0].get('url')
                song_id = track.get('id')
                artists_array = track.get('artists')
                song_artists = []
                for j in range(len(artists_array)):
                    dum_artist = artists_array[j]
                    song_artist = {
                        'artist_name': dum_artist.get('name'),
                        'artist_id': dum_artist.get('id')
                    }
                    song_artists.append(song_artist)   

                song = {
                    'title': track.get('name'),
                    'album': album,
                    'duration': duration,
                    'artists': song_artists,
                    'image': album_cover,
                    'id': song_id,
                    'added_at': added_at
                }
                songs.append(song)
            endpoint = response.get('next')
            if endpoint == None:
                break
            response = get(endpoint, {}, headers=headers).json()
        return Response(songs, status=status.HTTP_200_OK)

class checkLiked(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f"tracks/contains?ids={id}"
        response = execute_spotify_api_request(host,endpoint)
        return Response(response, status=status.HTTP_200_OK)