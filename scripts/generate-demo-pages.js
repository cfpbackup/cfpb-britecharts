const fs = require('fs-extra');
const path = require('path');

const demosPath = path.join(__dirname, '../demos');
const docsPath = path.join(__dirname, '../docs');
const demosHtmlPath = path.join(docsPath, 'demos'); // NEW: Put demos in /docs/demos/

// Ensure demos directory exists in docs
fs.ensureDirSync(demosHtmlPath);

const demoFiles = [
    'bar', 'bullet', 'brush', 'donut', 'color', 'grouped-bar', 'grouped-row',
    'heatmap', 'kitchen-sink', 'legend', 'line', 'row', 'scatter-plot',
    'sparkline', 'stacked-area', 'stacked-bar', 'step'
];

const htmlTemplate = (demoName, demoContent) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${demoName} Demo - Britecharts</title>

    <!-- Britecharts CSS -->
    <link type="text/css" rel="stylesheet" href="/demos/css/britecharts.css" />
    <link type="text/css" rel="stylesheet" href="/css/britecharts.css" />

    <!-- D3 v5 -->
    <script src="https://d3js.org/d3.v5.min.js"></script>

    <!-- Britecharts Bundle -->
    <script src="/dist/bundled/britecharts.min.js"></script>

    <style>
        body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
        }
        .row {
            margin-bottom: 40px;
        }
        .card--chart {
            min-height: 200px;
            background: #fafafa;
            padding: 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    ${demoContent}

    <!-- Demo Script -->
    <script src="/assets/demo-${demoName}.js"></script>
</body>
</html>`;

console.log('📄 Generating demo HTML pages...');

let generatedCount = 0;

demoFiles.forEach(demoName => {
    const htmlFragmentPath = path.join(demosPath, `${demoName}.html`);
    const outputPath = path.join(demosHtmlPath, `${demoName}.html`); // NEW: Output to /docs/demos/

    if (fs.existsSync(htmlFragmentPath)) {
        const demoContent = fs.readFileSync(htmlFragmentPath, 'utf8');
        const fullHtml = htmlTemplate(demoName, demoContent);

        fs.writeFileSync(outputPath, fullHtml);
        console.log(`  ✓ Generated demos/${demoName}.html`);
        generatedCount++;
    } else {
        console.log(`  ⚠ Skipped ${demoName}.html (not found)`);
    }
});

console.log(`✅ Generated ${generatedCount} demo pages in docs/demos/!`);
console.log(`📍 Access them at: http://localhost:8001/demos/{chart-name}.html`);
