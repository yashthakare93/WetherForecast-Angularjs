angular.module('weatherApp', [])
    .controller('WeatherController', ['$scope', '$http', function($scope, $http) {
        $scope.city = '';
        $scope.weatherData = {};

        $scope.convertTimestampToTime = function(timestamp) {
            if (timestamp && !isNaN(timestamp)) {
                return new Date(timestamp * 1000).toLocaleTimeString();
            } else {
                return 'Not available';
            }
        };

        $scope.getWeather = function() {
            var apiKey = '254410c333cae306e8410c76bcc75dbb';
            var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

            var url = `${apiUrl}&q=${$scope.city}&appid=${apiKey}`;

            $http.get(url)
                .then(function(response) {
                    $scope.weatherData = response.data;
                    console.log('Weather Data:', $scope.weatherData);
                })
                .catch(function(error) {
                    console.error('Error fetching weather data:', error);
                });
        };

        $scope.currentDate = new Date();

        $scope.getWeatherIcon = function(weatherData) {
            const iconMapping = {
                'Clear': 'images/clear.png',
                'Clouds': 'images/cloud.png',
                'Rain': 'images/rain.png',
                'Haze': 'images/haze.png',
                'Mist': 'images/mist.png',
                'Snow': 'images/snow.png'
            };
        
        
            if (weatherData.weather && weatherData.weather.length > 0) {
                const weatherCondition = weatherData.weather[0].main;
                return iconMapping[weatherCondition] || 'images/404.png';
            }
            return 'images/404.png';
            
        };
        
    }]);

