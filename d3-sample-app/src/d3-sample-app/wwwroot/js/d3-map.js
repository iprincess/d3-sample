(function () {
    var d3Section = d3.select('#d3-map');
    var w = 500;
    var h = 300;

    var projection = d3.geo.albersUsa()
        .translate([w / 2, h / 2])
        .scale([w]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3Section.append('svg').attr({ width: w, height: h });
    
    function renderMap(data) {
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#666666');
    }

    $(window).on('state-json-ready', function () {
        renderMap(window.stateJson);
    });
    
})();