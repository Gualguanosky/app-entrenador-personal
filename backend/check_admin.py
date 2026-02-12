import urllib.request

url = 'http://127.0.0.1:8001/admin/'

try:
    with urllib.request.urlopen(url) as response:
        print(f"Status Code: {response.getcode()}")
        print("Success: Admin page is reachable.")
except Exception as e:
    print(f"Error reaching admin: {e}")
