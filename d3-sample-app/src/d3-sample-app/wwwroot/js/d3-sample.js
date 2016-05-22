(function () {
    var d3Section = d3.select('#d3')

    // circle
    d3Section
        .append('svg')
            .attr('width', 50)
            .attr('height', 50)
        .append('circle')
            .attr('cx', 25)
            .attr('cy', 25)
            .attr('r', 25)
            .style('fill', 'lightblue');

    // text
    d3Section
        .append('svg')
            .attr('width', 250)
            .attr('height', 50)
        .append('text')
            .text('Hi, d3 text')
            .attr('x', 5)
            .attr('y', 25);

    // rectangles with data
    var data = [5, 10, 15, 20, 25];
    var w = 500;
    var h = 100;
    var padding = 2;
    var count = data.length;
    var heightMultiplier = h / 25; // max value of data

    d3.select('#d3-data')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr('x', function (d, i) { return i * (w / count); })
            .attr('y', function (d, i) { return h - (d * heightMultiplier); })    // origin for d3 is top, do this to place rects at bottom
            .attr('width', w / count - padding)
            .attr('height', function (d, i) { return d * heightMultiplier; });

})();