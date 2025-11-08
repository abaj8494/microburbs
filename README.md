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

### GitHub Pages (Static Hosting) - Recommended ⭐

The easiest way to use this dashboard:

1. **Clone and push to GitHub:**
```bash
git clone <repository-url>
cd microburbs
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click Save

3. **Visit your live site:**
```
https://yourusername.github.io/microburbs
```

That's it! The site works entirely in the browser with no server needed.

### Local Development (Option 1: Direct File)

Simply open `index.html` in your browser:
```bash
open index.html  # macOS
# or
start index.html # Windows
# or
xdg-open index.html # Linux
```

### Local Development (Option 2: With Flask Server)

If you want to run a local development server:

1. Create and activate virtual environment:
```bash
python3 -m venv micro
source micro/bin/activate  # macOS/Linux
# micro\Scripts\activate   # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

4. Open your browser:
```
http://localhost:5001
```

## 📁 Project Structure

```
microburbs/
├── index.html            # Main dashboard HTML (GitHub Pages entry point)
├── styles.css            # Modern, responsive CSS
├── app.js               # Vanilla JavaScript with direct API calls
├── response.json        # Sample data fallback
├── app.py               # Optional Flask server for local dev
├── requirements.txt     # Python dependencies (optional)
├── static/              # Legacy Flask static files
└── README.md           # This file
```

## 🎯 Usage

1. **Enter a Suburb**: Type any suburb name (e.g., "Belmont North", "Newcastle")
2. **Filter by Property Type** (Optional): Select a specific property type (House, Unit, etc.)
3. **Click Search** or press **Enter**: View results with interactive charts and property cards
4. **Explore Data**: Scroll through property listings and detailed statistics

### How It Works

- **Direct API Integration**: The app calls the Microburbs API directly from your browser
- **No Backend Required**: Pure static site - works on GitHub Pages!
- **Smart Fallback**: If the API is unavailable, it loads sample data from `response.json`
- **CORS Friendly**: The Microburbs API supports cross-origin requests

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: Microburbs Property API (direct integration)
- **Hosting**: GitHub Pages (static hosting)
- **Design**: Modern gradient UI with responsive design
- **Optional Backend**: Python 3.8+, Flask 3.0 (for local development)

## 🌐 GitHub Pages Deployment

### Deployment Steps

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository **Settings**
   - Click **Pages** in the sidebar
   - Under "Source", select **main** branch
   - Click **Save**

3. **Access your live site:**
```
https://yourusername.github.io/microburbs
```

### How It Works

✅ **No server required** - Everything runs in the browser  
✅ **Direct API calls** - JavaScript fetches data from Microburbs API  
✅ **Smart fallback** - Uses `response.json` if API is unavailable  
✅ **Zero cost** - Completely free GitHub Pages hosting  

### Note on API Token

The API uses a demo token (`Bearer test`) which is included in the JavaScript. This is intentional and safe for demonstration purposes. For production use with a real API key, you would need a backend proxy.

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
# Create and activate virtual environment
python3 -m venv micro
source micro/bin/activate  # On macOS/Linux
# micro\Scripts\activate   # On Windows

# Install dependencies
pip install -r requirements.txt

# Run with debug mode
python app.py

# The app will run on http://localhost:5001
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
