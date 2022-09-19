from urllib import response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .utils import *
import json
import urllib.parse

class getPlaylist(APIView):
    def get(self, request, id,format=None):
        host = self.request.session.session_key
        endpoint = f"playlists/{id}"
        response = execute_spotify_api_request(host,endpoint, second_=True)
        images = response.get('images')
        image = ''
        if (len(images) != 0):
            image = images[0].get('url')


        items = response.get('tracks').get('items')

        songs = []
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


        playlist = {
            'name': response.get('name'),
            'description': response.get('description'),
            'followers': response.get('followers').get('total'),
            'image': image,
            'id': response.get('id'),
            'owner': response.get('owner').get('display_name'),
            'songs': songs
        }
        return Response(playlist, status=status.HTTP_200_OK)

class createPlaylist(APIView):
    def post(self, request, format=None):
        host = self.request.session.session_key
        endpoint = ""
        user = execute_spotify_api_request(host, endpoint)

        user_id = user.get('id')
        endpoint = f'users/{user_id}/playlists'
        data = json.dumps(request.data.get('description'))
        create_playlist = execute_spotify_api_request_data(host, endpoint, data, post_=True, second_=True)

        playlist_id = create_playlist.get('id')
        songs = request.data.get('songs')
        uris = ""
        for i in range(len(songs)):
            uris += "," + songs[i].get('uri')
        uris = uris[1:len(uris)]
        uris = urllib.parse.quote(uris)
        endpoint = f'playlists/{playlist_id}/tracks?uris={uris}'
        add_playlist = execute_spotify_api_request(host, endpoint, post_=True, second_=True)
        return Response(add_playlist, status=status.HTTP_200_OK)