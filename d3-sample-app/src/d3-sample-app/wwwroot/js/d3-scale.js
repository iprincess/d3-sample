(function () {
    var d3Section = d3.select('#scale');
    var h = 100;
    var w = 400;
    var scale = d3.scale
        .linear()
        .domain([130, 350])
        .range([10, 100]);

    // console.log(300); 79.45

    function showHeader(ds) {
        d3Section.append('h4').text(ds.category + ' Sales (2013)');
    }

    function buildLine(ds) {
        var xScale = d3.scale.linear()
            .domain([
                d3.min(ds.monthlySales, function (d) { return d.month; }),
                d3.max(ds.monthlySales, function (d) { return d.month; }),
            ])
            .range([0, w]);
        
        var yScale = d3.scale.linear()
            .domain([
                0,
                d3.max(ds.monthlySales, function (d) { return d.sales; })
            ])
            .range([h, 0]);

        var lineFun = d3.svg.line()
            .x(function (d) { return xScale(d.month); })
            .y(function (d) { return yScale(d.sales); })
            .interpolate('linear');

        var svg = d3Section.append('svg')
            .attr({
                width: w,
                height: h
            });

        var viz = svg.append('path')
            .attr({
                d: lineFun(ds.monthlySales),
                'stroke': 'purple',
                'stroke-width': 2,
                'fill': 'none'
            });
    }

    d3.json('files/sales/monthly_sales_by_category_multiple.json', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            data.contents.forEach(function (ds) {
                showHeader(ds);
                buildLine(ds);
            });
        }
    });

})();