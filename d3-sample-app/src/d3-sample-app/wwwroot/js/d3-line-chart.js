(function () {
    var w = 300;
    var h = 200;
   
    var data = [
            { month: 10, sales: 20 },
            { month: 20, sales: 14 },
            { month: 30, sales: 21 },
            { month: 40, sales: 15 },
            { month: 50, sales: 22 },
            { month: 60, sales: 9 },
            { month: 70, sales: 6 },
            { month: 80, sales: 23 },
            { month: 90, sales: 7 },
            { month: 100, sales: 16 },
        ];
    var count = data.length;

    var lineFun = d3.svg.line()
        .x(function (d) { return d.month * 3; })
        .y(function (d) { return h-d.sales; })
        .interpolate('linear');

    var svg = d3.select('#d3-line-chart')
        .append('svg')
            .attr('width', w)
            .attr('height', h);

    var viz = svg.append('path')
        .attr({
            d: lineFun(data),
            'stroke': 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });
    
    var labels = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) { return d.sales; })
        .attr({
            x: function (d) { return d.month*3 -25; },
            y: function (d) { return h - d.sales; },
            'font-size': '12px',
            'font-family': 'sans-serif',
            'fill': '#666666',
            'text-anchor': 'start',
            'dy': '.35em'
        })


})();