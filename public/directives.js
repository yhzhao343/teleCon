(function() {
    'use strict'
    angular.module('teleCtrl.directives')
      .directive('d3Test', ['d3Service', 'star_calc','star_settings', function(d3Service, star_calc, star_settings) {
        return {
          restrict: 'EA',
          scope: {
            data: "=",
            label: "@",
            onClick: "&"
          },
          link: function(scope, iElement, iAttrs) {
            d3Service.d3().then(function(d3) {
                var width = star_settings.width;
                var height = star_settings.height;
                var randomX = d3.random.normal(width / 2, 80);
                var randomY = d3.random.normal(height / 2, 80);
                star_calc.radec2azel();
                var data = star_calc.project();
                // var data = star_calc.stereo();
                var x = d3.scale.linear()
                    .domain([0, width])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([0, height])
                    .range([height, 0]);

                var svg = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                  .append("g")

                svg.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height);

                var circle = svg.selectAll("circle")
                    .data(data)
                    .enter().append("circle")
                    .attr("cx", function(d){return d.x || 0})
                    .attr("cy", function(d){return d.y || 0})
                    .attr("r", function(d) {return 1.2*Math.max(3-d.mag/2.1, 0.5)});

                if (star_settings.star_name_on) {
                    var text = svg.selectAll("text")
                        .data(data)
                        .enter().append("text")
                        .attr("x", function(d){return d.x + 5 || 0})
                        .attr("y", function(d){return d.y + 5 || 0})
                        .text(function(d) {if (d.mag < star_settings.star_name_magnitude) {return d.proper}});
                };

            });
          }
    }}]
    );
})()