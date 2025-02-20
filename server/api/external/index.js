var express = require('express');
var router = express.Router();
var request = require('request');
var settings = require('../../config/apiSettings');

router.get('/google-maps-api/:library', function(req, res, next) {
    var library = req.params.library;
    var url = 'https://maps.googleapis.com/maps/api/js?libraries=' + library + '&key=' + settings.GOOGLE_API_KEY;

    res.setHeader('content-type', 'text/javascript');
    request(url).pipe(res);
});

router.get('/google-streetview-api/:lat/:lng/', function(req, res, next) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    var url = "https://maps.googleapis.com/maps/api/streetview?size=300x120&location=" + lat + "," + lng + "&key=" + settings.GOOGLE_API_KEY;

    res.setHeader('content-type', 'text/javascript');
    request(url).pipe(res);
});

router.get('/mapbox-staticmap/:lat/:lng/:totalAdopters', function(req, res, next) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    var totalAdopters = req.params.totalAdopters;
    var marker = totalAdopters > 0 ? "pin-s-" + totalAdopters + "+32cd32" : "pin-s";

    var url = "https://api.mapbox.com/styles/v1/" + settings.MAP_BOX_USER + "/" + settings.MAP_BOX_MAP_ID + "/static/" + marker + "(" + lat + "," + lng +")/" + lat + "," + lng + ",15/120x95?logo=false&access_token=" + settings.MAP_BOX_API_KEY;

    res.setHeader('content-type', 'text/javascript');
    request(url).pipe(res);
});

router.get('/mapbox-map-credentials/', function(req, res, next) {

    res.status(200).json({
        apiKey: settings.MAP_BOX_API_KEY,
        mapId: settings.MAP_BOX_MAP_ID,
        userId: settings.MAP_BOX_USER
    });
});


module.exports = router;