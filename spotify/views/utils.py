from ..models import SpotifyToken, topSongs
from django.utils import timezone
from datetime import timedelta
from requests import post, put, get
import os
from dotenv import load_dotenv

load_dotenv()
# CLIENT_ID = os.getenv('CLIENT_ID')
# CLIENT_SECRET = os.getenv('CLIENT_SECRET')
# REDIRECT_URI = os.getenv('REDIRECT_URI')
CLIENT_ID="c5999130780b416ba46e89c26e802460"
CLIENT_SECRET="3a9fb567425140bf9af5883fd6ed54af"
REDIRECT_URI="http://127.0.0.1:8000/spotify/redirect"


BASE_URL = "https://api.spotify.com/v1/me/"
BASE_URL2 = "https://api.spotify.com/v1/"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        top_songs = topSongs(last_updated=timezone.now(), top_songs={'song':1})
        top_songs.save()
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in, top_songs=top_songs)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        return True

    return False


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False, second_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + tokens.access_token}
    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)
        
    if second_:
        response = get(BASE_URL2 + endpoint, {}, headers=headers)
        try:
            return response.json()
        except:
            return {'Error': 'Issue with request'}
    
    # else
    response = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}


def execute_spotify_api_request_data(session_id, endpoint, data, post_=False, put_=False, second_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': "application/json",
               'Authorization' : 'Bearer ' + tokens.access_token}
    if post_:
        post(BASE_URL + endpoint, headers=headers, data=data)
    if put_:
        response = put(BASE_URL + endpoint, headers=headers, data=data)
    try:
        return response.json()
    except ValueError as err:
        return {"Error":f"Issue with request"}
