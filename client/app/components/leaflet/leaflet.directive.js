(function () {
  angular.module('notinphillyServerApp').directive('leaflet',  ['$window', '$rootScope', 'mapService', 'settingsService', 'APP_CONSTS', function ($window, $rootScope, mapService, settingsService, APP_CONSTS) {
    return {
      restrict: 'E',
      scope: {},
      replace: true,
      template: '<div></div>',
      controller: function($scope) {

    },
    link: function(scope, element, attributes){
      settingsService.getMapSettings().then(function(settings) {
          scope.mapId =  attributes.id;
          $(element).attr("id", scope.mapId);

          if ($("#" +  scope.mapId).length === 0)
          {
            mapService.removeMap();
            return;
          }

          var map = L.map(scope.mapId, {
                            center: [settings.center.lng, settings.center.lat],
                            zoom: 12,
                            zoomControl: false
                          });
  
          L.tileLayer('https://api.mapbox.com/styles/v1/{userId}/{mapId}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
              subdomains: ['a','b','c','d'],
              mapId: settings.mapId,
              accessToken: settings.accessToken,
              userId: settings.userId
          }).addTo(map);
  
          mapService.setMap(map);
        });
      }
    };
  }]);
})();
