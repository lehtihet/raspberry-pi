


<h1 align="center">A web browser Startpage made with Flask. </h1>

![Preview](./docs/startpage.png)


## About

This is a locally hosted startpage meant to replace whatever the default startpage is in Chrome/Firefox etc. 

Other than providing quick access to common webpages it also displays the weather and the current price for a selected stock (e.g. $SPY) along with the daily percentage change.

The stock price API call is limited to once per hour to keep within the free 25/day limit. 

## Getting started

#### Web server
Start by setting up the config.json file with API keys along with a latitude and longitude for the weather. Get the keys from [Alpha Vantage](https://www.alphavantage.co/) and [OpenWeatherMap](https://openweathermap.org/api)

Install ```venv``` to create a virtual python environment.
```apt-get install python3-venv```

```python3 -m venv .venv```

```. .venv/bin/activate```

Install dependencies.

```pip install -r requirements.txt```

Then run the server as a background process.

```nohup python3 app.py > output.log 2>&1 &```

To kill it:

```ps aux | grep app.py```

```kill PID```

#### Client
On Chrome:
Settings -> On startup -> Open a specific page or set of pages -> add URL for the webserver (e.g. raspberrypi:5000).

Then Settings -> Appearance -> Show home button -> URL for the webserver.

Can use an extension to bring up the page on New Tab, like [Fast New Tab Redirect](https://chrome.google.com/webstore/detail/fast-new-tab-redirect/ohnfdmfkceojnmepofncbddpdicdjcoi). 

## Issues

Exposes the API keys to the client.
