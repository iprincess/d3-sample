(function () {

    var data = [5, 10, 15, 20, 25, 11, 25, 22, 18, 7]; 
    var w = 300;
    var h = 100;
    var padding = 2;
    var count = data.length;
    var heightMultiplier = h / 25; // max value of data
    var svg = d3.select('#d3-bar-chart')
        .append('svg')
            .attr('width', w)
            .attr('height', h);

    //var data = [5, 10, 15, 20, 25];
    //svg.selectAll('rect')
    //    .data(data)
    //    .enter()
    //    .append('rect')
    //        .attr('x', function (d, i) { return i * (w / count); })
    //        .attr('y', function (d, i) { return h - (d * heightMultiplier); })    // origin for d3 is top, do this to place rects at bottom
    //        .attr('width', w / count - padding)
    //        .attr('height', function (d, i) { return d * heightMultiplier; })
    //        .attr('fill', function (d) { return 'rgb(' + d * 10 + ',230,230)'; });

    function colorPicker(v) {
        if (v <= 20) {
            return '#666666';
        } else if (v > 20) {
            return '#90E6E6';
        }
    };

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr({
                'x': function (d, i) { return i * (w / count); },
                'y': function (d, i) { return h - (d * heightMultiplier); },  // origin for d3 is top, do this to place rects at bottom
                'width': w / count - padding,
                'height': function (d, i) { return d * heightMultiplier; },
                'fill': function (d) { return colorPicker(d); }
            });

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) { return d; })
        .attr({
            'text-anchor': 'middle',
            x: function (d, i) { return i * w/count + (w/count - padding)/2; },
            y: function (d) { return h - (d * heightMultiplier);}
        })


})();