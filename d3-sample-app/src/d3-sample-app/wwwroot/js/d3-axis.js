(function () {
    var d3Section = d3.select('#axis');
    var h = 100;
    var w = 400;
    var padding = 20;

    function getDate(d) {
        var strDate = String(d);
        var year = strDate.substr(0, 4);
        var month = strDate.substr(4, 2) - 1;
        var day = strDate.substr(6, 2);

        return new Date(year, month, day);
    }

    function showHeader(ds) {
        d3Section.append('h4').text(ds.category + ' Sales (2013)');
    }

    function buildLine(ds) {
        var minDate = getDate(ds.monthlySales[0]['month']);
        var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

        var xScale = d3.time.scale()
            .domain([
                minDate,
                maxDate
            ])
            .range([padding+5, w-padding]);
        
        var yScale = d3.scale.linear()
            .domain([
                0,
                d3.max(ds.monthlySales, function (d) { return d.sales; })
            ])
            .range([h-padding, 10]);

        var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b'));
        var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(5);

        var lineFun = d3.svg.line()
            .x(function (d) { return xScale(getDate(d.month)); })
            .y(function (d) { return yScale(d.sales); })
            .interpolate('linear');

        var svg = d3Section.append('svg')
            .attr({
                width: w,
                height: h
            });

        var yAxis = svg.append('g').call(yAxisGen)
            .attr({
                'class': 'axis',
                'transform': 'translate(' + padding + ', 0)'
            });

        var xAxis = svg.append('g').call(xAxisGen)
            .attr({
                'class': 'axis',
                'transform': 'translate(0,' + (h-padding) + ')'
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