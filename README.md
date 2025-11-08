## instruction 

build a small web application / dashboard that showcases your ability to integrate data, display it meaningfully, and provide an engaging user experience. You can use any framework or library you like. Focus on how you turn complex data into something useful and self explanatory

## tech stack

use python, flask and vanilla javascript

## api

```
import requests

url = "https://www.microburbs.com.au/report_generator/api/suburb/properties"
params = {
    "suburb": "Belmont North"
}
headers = {
    "Authorization": "Bearer test",
    "Content-Type": "application/json"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)
```

### output

output is in `response.json`. we would also like to optionally make queries of the form:
```
params = {
    "suburb": "Belmont North",
    "property_type": "house"
}
```

you should make the dashboard versatile in that the user can choose the suburb and the property_type which is optional.

