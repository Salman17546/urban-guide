import requests
import base64
import os
from dotenv import load_dotenv
load_dotenv()
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')
#REDIRECT_URI_TOKEN = 'http://localhost:8000/callbackSpotifyToken'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'



def getUserSpotifyTopItems(token, type='artists', time_range='medium_term', limit=20):
    """
    Get a User's Top Artists and Tracks

    Parameters:
    token (str): The user's Spotify Web API Token
    type (str): The type of entity to return. Valid values: 'artists' or 'tracks'
    time_range (str): Over what time frame the affinities are computed. Valid values: 'short_term', 'medium_term', 'long_term'
    limit (int): The number of entities to return. Default: 20

    Returns:
    dict: The user's top artists or tracks
    """

    # Define the endpoint URL
    url = f"https://api.spotify.com/v1/me/top/{type}"

    # Define the headers for the request
    headers = {"Authorization": f"Bearer {token}"
    }

    # Define the query parameters for the request
    params = {
        "time_range": time_range,
        "limit": limit
    }

    # Make the GET request and get the response
    response = requests.get(url, headers=headers, params=params)

    print('RESPONSE-', response.text)

    # Return the JSON response
    return response

def getSpotifyUserAuth():
    
    scope = 'user-top-read user-read-email'
    
    # Define the query parameters for the request
    params = {
        "client_id": CLIENT_ID,
        "response_type": 'code',
        'scope': scope,
        "redirect_uri": REDIRECT_URI,
        "show_dialog": True
    }
    
    # Define the endpoint URL
    url = f"{AUTH_URL}"   
    
    # Make the GET request and get the response which is actually code which will be interchanged later with access token
    response = requests.get(url, params=params)    
    
    # Return the JSON response
    return response

def spotifyTokenCreation(code):
    
    grant_type = "authorization_code"
    authorization = f"{CLIENT_ID}:{CLIENT_SECRET}"
    authorization = base64.b64encode(authorization.encode()).decode()
    
    data = {
        "form": {"grant_type": grant_type, "code":code, "redirect_uri": REDIRECT_URI},
        "header": {"Authorization": f"Basic {authorization}"}
    }
    
    response = requests.post(TOKEN_URL, data=data["form"], headers=data["header"])
    
    return response
    