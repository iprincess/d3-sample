(function () {
    var d3Section = d3.select('#d3-map-2');
    var w = 500;
    var h = 300;

    var projection = d3.geo.albersUsa()
        .translate([w / 2, h / 2])
        .scale([w]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3Section.append('svg').attr({ width: w, height: h });

    // Courtesy of color brewer http://colorbrewer2.org/
    // http://colorbrewer2.org/?type=sequential&scheme=BuPu&n=6
    var colorScale = d3.scale.linear()
        .range(['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c']);

    function renderMap(json, salesData) {
        // join data together
        for (var i = 0; i < salesData.length; i++) {
            var salesState = salesData[i].state;
            var salesVal = parseFloat(salesData[i].sales);

            for (var j = 0; j < json.features.length; j++) {
                var usState = json.features[j].properties.NAME;

                if (salesState === usState) {
                    json.features[j].properties.value = salesVal;
                    break;
                }
            }
        }

        svg.selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('fill', function (d) {
                var value = d.properties.value;

                if (value) {
                    return colorScale(value);
                } else {
                    return '#666666';
                }
            });
    }

    d3.csv('/files/sales/state_sales.csv', function (data) {

        colorScale.domain([0, d3.max(data, function (d) { return d.sales; })]);

        $(window).on('state-json-ready', function () {
            renderMap(window.stateJson, data);
        });        
    });
    

    
})();