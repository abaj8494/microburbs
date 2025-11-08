// App State
let currentData = null;

// DOM Elements
const suburbInput = document.getElementById('suburb-input');
const propertyTypeSelect = document.getElementById('property-type-select');
const searchBtn = document.getElementById('search-btn');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const resultsSection = document.getElementById('results-section');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    // Load sample data on startup
    loadSampleData();
});

// Setup Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    
    // Allow search on Enter key
    suburbInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    suburbInput.addEventListener('input', () => {
        if (errorMessageEl) {
            errorMessageEl.classList.add('hidden');
        }
    });
}

// Load Sample Data (from response.json for GitHub Pages compatibility)
async function loadSampleData() {
    try {
        const response = await fetch('/response.json');
        const data = await response.json();
        currentData = data.results;
        displayResults(currentData, 'Belmont North (Sample Data)');
    } catch (error) {
        console.log('Sample data not available, waiting for search');
    }
}

// Handle Search
async function handleSearch() {
    const suburb = suburbInput.value.trim();
    const propertyType = propertyTypeSelect.value;
    
    if (!suburb) {
        showError('Please enter a suburb name');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const params = new URLSearchParams({ suburb });
        if (propertyType) {
            params.append('property_type', propertyType);
        }
        
        const response = await fetch(`/api/properties?${params}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        currentData = data.results;
        
        if (!currentData || currentData.length === 0) {
            showError('No properties found for the selected criteria');
            hideLoading();
            return;
        }
        
        displayResults(currentData, suburb);
        hideLoading();
        
    } catch (error) {
        console.error('Search error:', error);
        showError(`Error: ${error.message}`);
        hideLoading();
    }
}

// Display Results
function displayResults(properties, location) {
    // Calculate statistics
    const stats = calculateStats(properties);
    
    // Update stats cards
    document.getElementById('total-properties').textContent = stats.total;
    document.getElementById('avg-price').textContent = formatCurrency(stats.avgPrice);
    document.getElementById('avg-bedrooms').textContent = stats.avgBedrooms.toFixed(1);
    document.getElementById('location-name').textContent = location;
    
    // Render charts
    renderPriceChart(properties);
    renderTypeChart(properties);
    
    // Render property cards
    renderPropertyCards(properties);
    
    // Show results section
    resultsSection.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Calculate Statistics
function calculateStats(properties) {
    const validPrices = properties.filter(p => p.price).map(p => p.price);
    const validBedrooms = properties.filter(p => p.attributes?.bedrooms).map(p => p.attributes.bedrooms);
    
    return {
        total: properties.length,
        avgPrice: validPrices.length > 0 ? validPrices.reduce((a, b) => a + b, 0) / validPrices.length : 0,
        avgBedrooms: validBedrooms.length > 0 ? validBedrooms.reduce((a, b) => a + b, 0) / validBedrooms.length : 0,
        minPrice: validPrices.length > 0 ? Math.min(...validPrices) : 0,
        maxPrice: validPrices.length > 0 ? Math.max(...validPrices) : 0
    };
}

// Render Price Distribution Chart (Bar Chart)
function renderPriceChart(properties) {
    const priceChartEl = document.getElementById('price-chart');
    
    // Create price ranges
    const ranges = [
        { label: 'Under $750k', min: 0, max: 750000, count: 0 },
        { label: '$750k - $1M', min: 750000, max: 1000000, count: 0 },
        { label: '$1M - $1.25M', min: 1000000, max: 1250000, count: 0 },
        { label: '$1.25M - $1.5M', min: 1250000, max: 1500000, count: 0 },
        { label: 'Over $1.5M', min: 1500000, max: Infinity, count: 0 }
    ];
    
    // Count properties in each range
    properties.forEach(prop => {
        if (prop.price) {
            const range = ranges.find(r => prop.price >= r.min && prop.price < r.max);
            if (range) range.count++;
        }
    });
    
    // Find max count for scaling
    const maxCount = Math.max(...ranges.map(r => r.count), 1);
    
    // Create bar chart HTML
    const barsHTML = ranges.map(range => {
        const percentage = (range.count / maxCount) * 100;
        return `
            <div class="bar-item">
                <div class="bar-label">${range.label}</div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percentage}%">
                        <span class="bar-value">${range.count}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    priceChartEl.innerHTML = `<div class="bar-chart">${barsHTML}</div>`;
}

// Render Property Type Chart (Pie Chart representation with bars)
function renderTypeChart(properties) {
    const typeChartEl = document.getElementById('type-chart');
    
    // Count property types
    const typeCounts = {};
    properties.forEach(prop => {
        const type = prop.property_type || 'Unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // Sort by count
    const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1]);
    
    const maxCount = sortedTypes[0]?.[1] || 1;
    
    // Color palette
    const colors = [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f59e0b',
        '#10b981',
        '#06b6d4'
    ];
    
    // Create type chart HTML
    const barsHTML = sortedTypes.map(([type, count], index) => {
        const percentage = (count / maxCount) * 100;
        const color = colors[index % colors.length];
        return `
            <div class="bar-item">
                <div class="bar-label">${type}</div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percentage}%; background: ${color}">
                        <span class="bar-value">${count}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    typeChartEl.innerHTML = `<div class="bar-chart">${barsHTML}</div>`;
}

// Render Property Cards
function renderPropertyCards(properties) {
    const gridEl = document.getElementById('properties-grid');
    
    // Sort by price (descending)
    const sortedProperties = [...properties].sort((a, b) => (b.price || 0) - (a.price || 0));
    
    const cardsHTML = sortedProperties.map(property => createPropertyCard(property)).join('');
    gridEl.innerHTML = cardsHTML;
}

// Create Property Card HTML
function createPropertyCard(property) {
    const {
        address,
        price,
        property_type,
        attributes = {},
        listing_date
    } = property;
    
    const {
        bedrooms,
        bathrooms,
        garage_spaces,
        land_size,
        description
    } = attributes;
    
    const addressStr = address ? `${address.street}, ${address.sal}, ${address.state}` : 'Address not available';
    const truncatedDesc = description 
        ? (description.length > 200 ? description.substring(0, 200) + '...' : description)
        : 'No description available';
    
    return `
        <div class="property-card">
            <div class="property-header">
                <div class="property-price">${formatCurrency(price)}</div>
                <div class="property-address">${addressStr}</div>
            </div>
            <div class="property-body">
                <span class="property-type">${property_type || 'Unknown'}</span>
                <div class="property-details">
                    ${bedrooms ? `
                        <div class="detail-item">
                            <span class="detail-icon">🛏️</span>
                            <span>${bedrooms} bed${bedrooms !== 1 ? 's' : ''}</span>
                        </div>
                    ` : ''}
                    ${bathrooms ? `
                        <div class="detail-item">
                            <span class="detail-icon">🚿</span>
                            <span>${bathrooms} bath${bathrooms !== 1 ? 's' : ''}</span>
                        </div>
                    ` : ''}
                    ${garage_spaces ? `
                        <div class="detail-item">
                            <span class="detail-icon">🚗</span>
                            <span>${garage_spaces} car space${garage_spaces !== 1 ? 's' : ''}</span>
                        </div>
                    ` : ''}
                    ${land_size ? `
                        <div class="detail-item">
                            <span class="detail-icon">📏</span>
                            <span>${formatLandSize(land_size)}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="property-description">${truncatedDesc}</div>
                ${listing_date ? `
                    <div class="property-meta">
                        Listed: ${formatDate(listing_date)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Utility Functions
function formatCurrency(value) {
    if (!value) return 'Price on request';
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatLandSize(size) {
    if (!size || size === 'nan' || size === 'None') return 'N/A';
    const numericSize = parseFloat(size);
    if (isNaN(numericSize)) return size;
    return `${numericSize.toLocaleString()} m²`;
}

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

function showLoading() {
    loadingEl.classList.remove('hidden');
    resultsSection.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.classList.remove('hidden');
}

function hideError() {
    errorMessageEl.classList.add('hidden');
}

