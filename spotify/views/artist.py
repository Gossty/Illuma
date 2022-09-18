from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .utils import *

class getArtist(APIView):
    def get(self, request, id,format=None):
        host = self.request.session.session_key
        endpoint = f'artists/{id}'
        response = execute_spotify_api_request(host, endpoint, second_=True)
        artist = {
            'name': response.get('name'),
            'followers':response.get('followers').get('total'),
            'genres': response.get('genres'),
            'image': response.get('images')[0].get('url'),
            'popularity': response.get('popularity'),
            'id': response.get('id'),
        }
        return Response(artist,status=status.HTTP_200_OK)


class artistTopTracks(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f'artists/{id}/top-tracks?market=US'
        top_tracks = execute_spotify_api_request(host, endpoint, second_=True)
        tracks = top_tracks.get('tracks')
        top_tracks = []
        for i in range(len(tracks)):
            track = tracks[i]

            # getting object array of artists
            artists_array = track.get('artists')
            song_artists = []
            for j in range(len(artists_array)):
                dum_artist = artists_array[j]
                song_artist = {
                    'artist_name': dum_artist.get('name'),
                    'artist_id': dum_artist.get('id')
                }
                song_artists.append(song_artist)            

            # one single top track
            album = {
                'album_name': track.get('album').get('name'),
                'id': track.get('album').get('id'),
                'release_date': track.get('album').get('release_date'),
                'image': track.get('album').get('images')[0].get('url'),
            }
            top_track = {
                'song_name': track.get('name'),
                'song_id': track.get('id'),
                'album': album,
                'duration': track.get('duration_ms'),
                'artists': song_artists
            } 
            top_tracks.append(top_track)
        return Response(top_tracks, status=status.HTTP_200_OK)


class artistAlbums(APIView):
    def get(self,request, id, format=None):
        host = self.request.session.session_key
        endpoint = f'artists/{id}/albums?limit=50'
        response = execute_spotify_api_request(host, endpoint, second_=True)

        albums = response.get('items')
        albums_array = []
        singles_array = []
        appears_array = []
        for i in range(len(albums)):
            if i > 0 and albums[i].get('name') == albums[i-1].get('name'):
                continue
            item = albums[i]
            artists = item.get('artists')
            album_artists = []
            for j in range(len(artists)):
                dum_album_artist = artists[j]
                album_artist = {
                    'artist_name': dum_album_artist.get('name'),
                    'artist_id': dum_album_artist.get('id')
                }
                album_artists.append(album_artist)     
            album_group = item.get('album_group')

            album = {
                    'album_name': item.get('name'),
                    'id': item.get('id'),
                    'release_date': item.get('release_date'),
                    'image': item.get('images')[0].get('url'),
                    'artists': album_artists
            }

            if (album_group == 'album'):
                albums_array.append(album)
            elif (album_group == 'single' or album_group == 'EP'):
                singles_array.append(album)
            else:
                appears_array.append(album)
        albums = {
            'albums': albums_array,
            'singles': singles_array,
            'appears': appears_array
        }

        return Response(albums, status=status.HTTP_200_OK)

class relatedArtists(APIView):
    def get(self, request, id, format=None):
        host = self.request.session.session_key
        endpoint = f'artists/{id}/related-artists'
        related_artists = execute_spotify_api_request(host, endpoint, second_=True)

        related_artists = related_artists.get('artists')
        similar_artists = []
        for i in range(len(related_artists)):
            item = related_artists[i]
            followers = item.get('followers').get('total')
            id = item.get('id')
            name = item.get('name')
            image = item.get('images')[0].get('url')
            artist = {
                'name' : name,
                'followers': followers,
                'id': id,
                'image': image,
            }
            similar_artists.append(artist)
        return Response(similar_artists, status=status.HTTP_200_OK)