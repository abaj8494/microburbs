# 🏠 Microburbs Property Dashboard

A modern, interactive web dashboard for exploring property listings with beautiful data visualizations and an engaging user experience.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)

## ✨ Features

- **Interactive Search**: Search properties by suburb with optional property type filtering
- **Real-time Statistics**: View key metrics including total properties, average price, and average bedrooms
- **Data Visualizations**: 
  - Price distribution bar chart
  - Property type breakdown chart
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Property Cards**: Detailed property listings with images, descriptions, and key attributes
- **API Integration**: Seamless integration with Microburbs API

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd microburbs
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask application:
```bash
python app.py
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
microburbs/
├── app.py                 # Flask backend with API proxy
├── requirements.txt       # Python dependencies
├── response.json         # Sample data for testing
├── static/
│   ├── index.html        # Main dashboard HTML
│   ├── styles.css        # Modern, responsive CSS
│   └── app.js           # Vanilla JavaScript for interactivity
└── README.md            # This file
```

## 🎯 Usage

1. **Select a Suburb**: Choose from the dropdown list of available suburbs
2. **Filter by Property Type** (Optional): Select a specific property type (House, Unit, etc.)
3. **Click Search**: View the results with interactive charts and property cards
4. **Explore Data**: Scroll through property listings and view detailed information

## 🔌 API Endpoints

### Get Properties
```
GET /api/properties?suburb=<suburb>&property_type=<type>
```

**Parameters:**
- `suburb` (required): Suburb name
- `property_type` (optional): Property type filter

**Example:**
```bash
curl "http://localhost:5000/api/properties?suburb=Belmont%20North&property_type=house"
```

### Get Suburbs List
```
GET /api/suburbs
```

Returns a list of available suburbs for the dropdown.

## 🎨 Tech Stack

- **Backend**: Python 3.8+, Flask 3.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: Microburbs Property API
- **Design**: Modern gradient UI with responsive design

## 🌐 GitHub Pages Deployment

For GitHub Pages deployment (static hosting), you have two options:

### Option 1: Static Data Mode
The app includes `response.json` as sample data. When the backend is not available, the dashboard will automatically load this sample data on startup.

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. The site will work with the sample data from `response.json`

### Option 2: Backend Deployment
For full API functionality:

1. Deploy the Flask backend to a service like:
   - Heroku
   - Railway
   - Render
   - PythonAnywhere

2. Update the API endpoints in `app.js` to point to your deployed backend

3. Deploy the `static/` folder to GitHub Pages

## 📊 Data Visualization

The dashboard includes two main visualizations:

1. **Price Distribution Chart**: Shows property count across different price ranges
   - Under $750k
   - $750k - $1M
   - $1M - $1.25M
   - $1.25M - $1.5M
   - Over $1.5M

2. **Property Type Chart**: Displays the distribution of different property types (House, Unit, etc.)

## 🎯 Key Metrics

The dashboard calculates and displays:
- **Total Properties**: Count of all matching properties
- **Average Price**: Mean price across all properties
- **Average Bedrooms**: Mean number of bedrooms
- **Location**: Current search location

## 🔧 Development

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run with debug mode
python app.py

# The app will run on http://localhost:5000
```

### Testing with Sample Data
The `response.json` file contains sample data from Belmont North. The app will automatically load this data on startup if the backend is not configured.

## 📝 Features Breakdown

### Backend (app.py)
- Flask REST API
- API proxy to hide authentication tokens
- Error handling and validation
- CORS support for cross-origin requests

### Frontend
- **HTML**: Semantic, accessible markup
- **CSS**: Modern design with:
  - CSS Grid and Flexbox layouts
  - Smooth animations and transitions
  - Gradient backgrounds
  - Responsive breakpoints
  - Card-based design system
- **JavaScript**: 
  - Vanilla JS (no frameworks)
  - Async/await for API calls
  - Dynamic DOM manipulation
  - Real-time chart rendering
  - Error handling and loading states

## 🎨 Design Decisions

1. **Modern Gradient UI**: Eye-catching purple gradient background for visual appeal
2. **Card-Based Layout**: Clean, organized presentation of information
3. **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
4. **Data Visualization**: Custom bar charts built with HTML/CSS for lightweight performance
5. **User Feedback**: Loading states, error messages, and smooth scrolling for better UX

## 🔒 Security

- API tokens are kept server-side in the Flask backend
- The frontend never exposes sensitive credentials
- Input validation on both client and server side

## 📈 Future Enhancements

- Map integration showing property locations
- Advanced filtering (price range, bedrooms, bathrooms)
- Sorting options (price, date, size)
- Property comparison feature
- Favorite/bookmark functionality
- Export data to CSV/PDF

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Python, Flask, and Vanilla JavaScript
