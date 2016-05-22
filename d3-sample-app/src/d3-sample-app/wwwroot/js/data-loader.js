(function(){
    d3.json('/files/geo-shapes/cb_2015_us_state_500k.json', function (data) {
        window.stateJson = data;
        $(window).trigger('state-json-ready');
    });
})();