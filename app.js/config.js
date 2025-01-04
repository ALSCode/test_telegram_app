const config = {
    API_URL: process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-url.com/api'
        : 'http://localhost:8000/api'
};