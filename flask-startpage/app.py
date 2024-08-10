import json
from flask import Flask, render_template

app = Flask(__name__)

with open('config.json', 'r') as config_file:
	config = json.load(config_file)

alphavantage_api = config['ALPHAVANTAGE_API_KEY']
alphavantage_symbol = config['ALPHAVANTAGE_SYMBOL']
weather_api = config['OPENWEATHERMAP_API_KEY']
weather_lat = config['OPENWEATHERMAP_LAT']
weather_lon = config['OPENWEATHERMAP_LON']

@app.route('/')
def index():
	return render_template('index.html', alphavantage_api=alphavantage_api, alphavantage_symbol=alphavantage_symbol, weather_api=weather_api, weather_lat=weather_lat, weather_lon=weather_lon)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
