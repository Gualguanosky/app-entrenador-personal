import urllib.request
import urllib.parse
import json

url = 'http://127.0.0.1:8001/api/token/'
data = {
    'username': 'admin',
    'password': 'admin123'
}

data_bytes = json.dumps(data).encode('utf-8')
req = urllib.request.Request(url, data=data_bytes, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(f"Response: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
