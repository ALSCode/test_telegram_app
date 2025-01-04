const config = {
    // Определяем окружение на основе URL
    API_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:8000/api'
        : 'https://your-backend-url.com/api'
};

// Экспортируем конфигурацию для использования в других файлах
window.appConfig = config;
