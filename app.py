from flask import Flask, jsonify, request, send_from_directory
import requests
import os

app = Flask(__name__, static_folder='static', static_url_path='')

# API Configuration
API_URL = "https://www.microburbs.com.au/report_generator/api/suburb/properties"
API_HEADERS = {
    "Authorization": "Bearer test",
    "Content-Type": "application/json"
}

@app.route('/')
def index():
    """Serve the main dashboard page"""
    return send_from_directory('static', 'index.html')

@app.route('/api/properties', methods=['GET'])
def get_properties():
    """
    Proxy endpoint for fetching property data
    Query params:
    - suburb: Required suburb name
    - property_type: Optional property type filter (e.g., 'house', 'unit')
    """
    suburb = request.args.get('suburb')
    property_type = request.args.get('property_type')
    
    if not suburb:
        return jsonify({'error': 'Suburb parameter is required'}), 400
    
    # Build request parameters
    params = {'suburb': suburb}
    if property_type:
        params['property_type'] = property_type
    
    try:
        # Make request to Microburbs API
        response = requests.get(API_URL, params=params, headers=API_HEADERS, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        return jsonify(data)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500

@app.route('/api/suburbs', methods=['GET'])
def get_suburbs():
    """Return a list of sample suburbs for the dropdown"""
    suburbs = [
        'Belmont North',
        'Newcastle',
        'Charlestown',
        'Warners Bay',
        'Redhead',
        'Jewells',
        'Belmont',
        'Merewether',
        'Hamilton'
    ]
    return jsonify({'suburbs': suburbs})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

