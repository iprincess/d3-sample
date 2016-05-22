(function () {
    var d3Section = d3.select('#d3-map-3');
    var w = 500;
    var h = 300;

    var projection = d3.geo.albersUsa()
        .translate([w / 2, h / 2])
        .scale([w]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3Section.append('svg').attr({ width: w, height: h });
    
    $(window).on('state-json-ready', function () {
        svg.selectAll('path')
            .data(window.stateJson.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#666666');

        d3.csv('/files/sales/sales_by_city.csv', function (sales) {
            svg.selectAll('circle')
                .data(sales)
                .enter()
                .append('circle')
                .attr({
                    cx: function (d) {
                        return projection([d.lon, d.lat])[0];
                    },
                    cy: function (d) { return projection([d.lon, d.lat])[1]; },
                    r: function (d) { return Math.sqrt(parseInt(d.sales) * 0.00005); },
                    'fill': 'red'
                });
        })
    });
})();