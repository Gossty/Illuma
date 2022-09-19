from re import M

from django.shortcuts import render, redirect
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .utils import *
import os
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
REDIRECT_URI = os.environ.get('REDIRECT_URI')

class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-email user-read-private playlist-read-collaborative playlist-read-private user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private user-library-read user-top-read user-read-recently-played'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class recentlyPlayed(APIView):
    def get(self,request, format=None):
        host = self.request.session.session_key
        endpoint = "player/recently-played?limit=50"
        response = execute_spotify_api_request(host, endpoint)
        items = response.get('items')
        if (items is None):
            return Response([], status=status.HTTP_200_OK)
        songs = []
        for i in range(len(items)):
            item = items[i].get('track')
            duration = item.get('duration_ms')
            album = {
                'album_name': item.get('album').get('name'),
                'id': item.get('album').get('id'),
            }
            image = item.get('album').get('images')[0].get('url')
            timePlayed = items[i].get('played_at')
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
                'timePlayed': timePlayed
            }
            songs.append(song)
        return Response(songs, status=status.HTTP_200_OK)


class getPlaylists(APIView):
    def get(self,request,format=None):
        host = self.request.session.session_key
        endpoint = "playlists"
        response = execute_spotify_api_request(host,endpoint)
        return Response(response, status=status.HTTP_200_OK)

class currentSong(APIView):
    def get(self, request, format=None):
        host = self.request.session.session_key
        endpoint = "player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)
        
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('item')
        progress = response.get('progress_ms')
        album = {
                'album_name': item.get('album').get('name'),
                'id': item.get('album').get('id'),
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
            'artists': song_artists,
            'album': album,
            'image': image,
            'id': song_id
        }
        return Response(song, status=status.HTTP_200_OK)

class getUser(APIView):
    def get(self, request, format=None):
        host = self.request.session.session_key
        endpoint = ""
        response = execute_spotify_api_request(host, endpoint)
        return Response(response, status=status.HTTP_200_OK)

class search(APIView):
    def get(self, request, query, format=None):
        if query == '∂∂∂∂':
            respondent = {
                'albums': {
                    'singles': [],
                    'albums': []
                },
                'artists': [],
                'songs': []
            }
            return Response(respondent, status=status.HTTP_200_OK)
        host = self.request.session.session_key
        endpoint = f"search?q={query}&type=track%2Cartist%2Calbum"
        response = execute_spotify_api_request(host, endpoint, second_=True)
        albums = response.get('albums').get('items')
        albums_array = []
        singles_array = []
        for i in range(len(albums)):
            if i > 0 and albums[i].get('name') == albums[i-1].get('name'):
                continue
            item = albums[i]
            artistsA = item.get('artists')
            album_artists = []
            for j in range(len(artistsA)):
                dum_album_artist = artistsA[j]
                album_artist = {
                    'artist_name': dum_album_artist.get('name'),
                    'artist_id': dum_album_artist.get('id')
                }
                album_artists.append(album_artist)     
            album_type = item.get('album_type')
            image = ""
            if len(item.get('images')) != 0:
                image = item.get('images')[0].get('url')

            album = {
                    'album_name': item.get('name'),
                    'id': item.get('id'),
                    'release_date': item.get('release_date'),
                    'image': image,
                    'artists': album_artists
            }

            if (album_type == 'album'):
                albums_array.append(album)
            elif (album_type == 'single' or album_type == 'EP'):
                singles_array.append(album)
        albums = {
            'albums': albums_array,
            'singles': singles_array,
        }

        artist_items = response.get('artists').get('items')
        artists = []
        for i in range(len(artist_items)):
            item = artist_items[i]
            followers = item.get('followers').get('total')
            genres = item.get('genres')
            id = item.get('id')
            name = item.get('name')
            popularity = item.get('popularity')

            image = ""
            if len(item.get('images')) != 0:
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

        song_items = response.get('tracks').get('items')
        songs = []
        for i in range(len(song_items)):
            item = song_items[i]
            duration = item.get('duration_ms')
            album = {
                'album_name': item.get('album').get('name'),
                'id': item.get('album').get('id'),
            }
            image = ""
            if len(item.get('album').get('images')) != 0:
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


        toReturn = {
            'albums': albums,
            'artists': artists,
            'songs': songs
        }
        return Response(toReturn, status=status.HTTP_200_OK)

class getDetails(APIView):
    def post(self, request, format=None):
        detailsDict = {}
        host = self.request.session.session_key
        data = request.data
        for i in range(0, len(data), 100):
            keys = []
            ids = ""
            j = i
            while j < i + 100 and j < len(data):
                keys.append(data[j]['title'])
                ids += "," + data[j]['id']
                j += 1
            ids = ids[1:len(ids)]
            endpoint = f"audio-features?ids={ids}"
            values = execute_spotify_api_request(host, endpoint, second_=True)
            dictTemporary = dict(zip(keys,values.get('audio_features')))
            detailsDict.update(dictTemporary)
        return Response(detailsDict, status=status.HTTP_200_OK)

        