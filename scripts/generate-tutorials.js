const fs = require('fs-extra');
const path = require('path');

const tutorials = [
    'bar', 'bullet', 'brush', 'donut', 'grouped-bar', 'grouped-row',
    'heatmap', 'legend', 'line', 'row', 'scatter-plot', 'sparkline',
    'stacked-area', 'stacked-bar', 'step', 'tooltip'
];

const docsPath = path.join(__dirname, '../docs');

tutorials.forEach(tutorial => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tutorial} Demo</title>
    <link type="text/css" rel="stylesheet" href="styles/custom.css">
    <link type="text/css" rel="stylesheet" href="styles/britecharts.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>${tutorial} Demo</h1>
        <div class="js-chart-container"></div>
    </div>
    <script src="/assets/demo-${tutorial}.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(docsPath, `tutorial-${tutorial}.html`), html);
});

console.log(`✅ Generated ${tutorials.length} tutorial HTML files`);
