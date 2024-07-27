$(function() {
    // Dark mode toggle function
    function toggleDarkMode() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    // Attach dark mode toggle to the button
    document.querySelector('.btn-liquid').addEventListener('click', toggleDarkMode);

    // Liquid effect for button
    var pointsA = [],
        pointsB = [],
        $canvas = null,
        canvas = null,
        context = null,
        points = 8,
        viscosity = 20,
        damping = 0.05;

    // Init button
    function initButton() {
        // Get button
        var button = $('.btn-liquid');
        var buttonWidth = button.width();
        var buttonHeight = button.height();

        // Create canvas
        $canvas = $('<canvas></canvas>');
        button.append($canvas);

        canvas = $canvas.get(0);
        canvas.width = buttonWidth + 100;
        canvas.height = buttonHeight + 100;
        context = canvas.getContext('2d');

        // Add points
        var x = buttonHeight / 2;
        for (var j = 1; j < points; j++) {
            addPoints((x + ((buttonWidth - buttonHeight) / points) * j), 0);
        }
        addPoints(buttonWidth - buttonHeight / 5, 0);
        addPoints(buttonWidth + buttonHeight / 10, buttonHeight / 2);
        addPoints(buttonWidth - buttonHeight / 5, buttonHeight);
        for (var j = points - 1; j > 0; j--) {
            addPoints((x + ((buttonWidth - buttonHeight) / points) * j), buttonHeight);
        }
        addPoints(buttonHeight / 5, buttonHeight);
        addPoints(-buttonHeight / 10, buttonHeight / 2);
        addPoints(buttonHeight / 5, 0);

        // Start render
        renderCanvas();
    }

    // Add points
    function addPoints(x, y) {
        pointsA.push(new Point(x, y, 1));
        pointsB.push(new Point(x, y, 2));
    }

    // Point constructor
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

    Point.prototype.move = function() {
        this.vx += (this.ix - this.x) / (viscosity * this.level);
        this.vy += (this.iy - this.y) / (viscosity * this.level);

        this.vx *= (1 - damping);
        this.x += this.vx;

        this.vy *= (1 - damping);
        this.y += this.vy;
    };

    // Render canvas
    function renderCanvas() {
        // rAF
        requestAnimationFrame(renderCanvas);

        // Clear scene
        context.clearRect(0, 0, $canvas.width(), $canvas.height());
        context.fillStyle = '#fff';
        context.fillRect(0, 0, $canvas.width(), $canvas.height());

        // Move points
        for (var i = 0; i <= pointsA.length - 1; i++) {
            pointsA[i].move();
            pointsB[i].move();
        }

        // Create dynamic gradient
        var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
        var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
        var distance = Math.sqrt(Math.pow(gradientX - $canvas.width() / 2, 2) + Math.pow(gradientY - $canvas.height() / 2, 2)) / Math.sqrt(Math.pow($canvas.width() / 2, 2) + Math.pow($canvas.height() / 2, 2));

        var gradient = context.createRadialGradient(gradientX, gradientY, 300 + (300 * distance), gradientX, gradientY, 0);
        gradient.addColorStop(0, '#102ce5');
        gradient.addColorStop(1, '#E406D6');

        // Draw shapes
        var groups = [pointsA, pointsB];

        for (var j = 0; j <= 1; j++) {
            var points = groups[j];

            if (j == 0) {
                // Background style
                context.fillStyle = '#1CE2D8';
            } else {
                // Foreground style
                context.fillStyle = gradient;
            }

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

    // Initialize button
    initButton();
});
