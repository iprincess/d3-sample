(function () {
    var d3Section = d3.select('#using-json');
    var h=100;
    var w=400;
    var ds; // global var for data
    var salesTotal = 0.0;
    var salesAvg = 0.0;
    var metrics = [];

    function buildLine() {
        var lineFun = d3.svg.line()
            .x(function (d) { return ((d.month - 20130001) / 3.25) })
            .y(function (d) { return h - d.sales; })
            .interpolate('linear');

        var svg = d3Section.append('svg')
            .attr({
                width: w,
                height: h
            });

        var viz = svg.append('path')
            .attr({
                d: lineFun(ds),
                'stroke': 'purple',
                'stroke-width': 2,
                'fill': 'none'
            });
    }

    d3.json('files/sales/monthly_sales.json', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            ds = data;
        }

        buildLine();
    });

    

})();