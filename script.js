$(function() {
    // Dark mode toggle function
    function toggleDarkMode() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    // Attach dark mode toggle to the button
    document.querySelector('.btn-liquid').addEventListener('click', toggleDarkMode);

    // Subtle liquid hover effect for tiles
    $('.skill-item, .experience-item, .link-item').each(function () {
        var tile = $(this);
        var tileWidth = tile.width();
        var tileHeight = tile.height();

        // Create canvas
        var $canvas = $('<canvas></canvas>');
        tile.append($canvas);

        var canvas = $canvas.get(0);
        canvas.width = tileWidth + 100;
        canvas.height = tileHeight + 100;
        var context = canvas.getContext('2d');

        // Vars
        var points = 8;
        var pointsA = [];
        var pointsB = [];
        var viscosity = 20;
        var damping = 0.05;

        // Add points
        function addPoints(x, y) {
            pointsA.push(new Point(x, y, 1));
            pointsB.push(new Point(x, y, 2));
        }

        function Point(x, y, level) {
            this.x = this.ix = 50 + x;
            this.y = this.iy = 50 + y;
            this.vx = 0;
            this.vy = 0;
            this.cx1 = 0;
            this.cy1 = 0;
            this.cx2 = 0;
            this.cy2 = 0;
            this.level = level;
        }

        Point.prototype.move = function () {
            this.vx += (this.ix - this.x) / (viscosity * this.level);
            this.vy += (this.iy - this.y) / (viscosity * this.level);

            this.vx *= (1 - damping);
            this.x += this.vx;

            this.vy *= (1 - damping);
            this.y += this.vy;
        };

        var x = tileHeight / 2;
        for (var j = 1; j < points; j++) {
            addPoints((x + ((tileWidth - tileHeight) / points) * j), 0);
        }
        addPoints(tileWidth - tileHeight / 5, 0);
        addPoints(tileWidth + tileHeight / 10, tileHeight / 2);
        addPoints(tileWidth - tileHeight / 5, tileHeight);
        for (var j = points - 1; j > 0; j--) {
            addPoints((x + ((tileWidth - tileHeight) / points) * j), tileHeight);
        }
        addPoints(tileHeight / 5, tileHeight);

        addPoints(-tileHeight / 10, tileHeight / 2);
        addPoints(tileHeight / 5, 0);

        // Render canvas
        function renderCanvas() {
            // rAF
            rafID = requestAnimationFrame(renderCanvas);

            // Clear scene
            context.clearRect(0, 0, $canvas.width(), $canvas.height());
            context.fillStyle = '#fff';
            context.fillRect(0, 0, $canvas.width(), $canvas.height());

            // Move points
            for (var i = 0; i <= pointsA.length - 1; i++) {
                pointsA[i].move();
                pointsB[i].move();
            }

            // Draw shapes
            var groups = [pointsA, pointsB];

            for (var j = 0; j <= 1; j++) {
                var points = groups[j];

                context.beginPath();
                context.moveTo(points[0].x, points[0].y);

                for (var i = 0; i < points.length; i++) {
                    var p = points[i];
                    var nextP = points[i + 1];

                    if (nextP != undefined) {
                        p.cx1 = (p.x + nextP.x) / 2;
                        p.cy1 = (p.y + nextP.y) / 2;
                        p.cx2 = (p.x + nextP.x) / 2;
                        p.cy2 = (p.y + nextP.y) / 2;

                        context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                    } else {
                        nextP = points[0];
                        p.cx1 = (p.x + nextP.x) / 2;
                        p.cy1 = (p.y + nextP.y) / 2;

                        context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                    }
                }

                context.fill();
            }
        }

        renderCanvas();
    });
});
