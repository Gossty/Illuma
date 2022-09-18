from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .utils import *

class topTracks(APIView):
    def get(self, request, term, format=None):
        host = self.request.session.session_key
        endpoint = f"top/tracks?time_range={term}&limit=50"
        response = execute_spotify_api_request(host, endpoint)
        items = response.get('items')
        if (items is None):
            return Response([], status=status.HTTP_200_OK)
        songs = []
        for i in range(len(items)):
            item = items[i]
            duration = item.get('duration_ms')
            album = {
                'album_name': item.get('album').get('name'),
                'id': item.get('album').get('id'),
                'release_date': item.get('album').get('release_date')
            }
            image = item.get('album').get('images')[0].get('url')
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
                'album': album,
                'artists': song_artists,
                'duration': duration,
                'image': image,
                'id': song_id,
            }
            songs.append(song)
        return Response(songs, status=status.HTTP_200_OK)


class topArtists(APIView):
    def get(self, request, term, format=None):
        host = self.request.session.session_key
        endpoint = f"top/artists?time_range={term}&limit=50"
        response = execute_spotify_api_request(host, endpoint)
        items = response.get('items')
        if (items is None):
            return Response([], status=status.HTTP_200_OK)
        artists = []
        for i in range(len(items)):
            item = items[i]
            followers = item.get('followers').get('total')
            genres = item.get('genres')
            id = item.get('id')
            name = item.get('name')
            popularity = item.get('popularity')
            image = item.get('images')[0].get('url')
            artist = {
                'name' : name,
                'popularity': popularity,
                'followers': followers,
                'genres': genres,
                'id': id,
                'image': image,
            }
            artists.append(artist)

        return Response(artists, status=status.HTTP_200_OK)