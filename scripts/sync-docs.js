const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

console.log('📋 Syncing documentation assets...');

// Define paths
const docsPath = path.join(__dirname, '../docs');
const docsScriptsPath = path.join(docsPath, 'scripts');
const docsBritechartsScriptsPath = path.join(docsPath, 'britecharts/scripts');
const demosPath = path.join(__dirname, '../demos');
const demosBuildPath = path.join(demosPath, 'build');

// Ensure directories exist
fs.ensureDirSync(docsScriptsPath);
fs.ensureDirSync(docsBritechartsScriptsPath);

// Copy demo files to docs/britecharts/scripts/
console.log('📦 Copying demo JavaScript files...');
try {
    if (fs.existsSync(demosBuildPath)) {
        const demoFiles = fs.readdirSync(demosBuildPath);
        demoFiles.forEach(file => {
            if (file.endsWith('.js')) {
                fs.copySync(
                    path.join(demosBuildPath, file),
                    path.join(docsBritechartsScriptsPath, file),
                    { overwrite: true }
                );
            }
        });
        console.log(`  ✓ Copied ${demoFiles.filter(f => f.endsWith('.js')).length} demo JavaScript files`);
    } else {
        console.log('  ⚠️  Demos not built yet. Run "yarn demos:compile" first.');
    }
} catch (err) {
    console.error('❌ Error copying demo files:', err);
}

// Copy demo HTML files to docs
console.log('📦 Copying demo HTML files...');
try {
    const demoHtmlFiles = glob.sync(path.join(demosPath, '*.html'));
    demoHtmlFiles.forEach(file => {
        const fileName = path.basename(file);
        const destPath = path.join(docsPath, `tutorial-${fileName}`);
        fs.copySync(file, destPath, { overwrite: true });
    });
    console.log(`  ✓ Copied ${demoHtmlFiles.length} demo HTML files as tutorial pages`);
} catch (err) {
    console.error('❌ Error copying demo HTML files:', err);
}

// Copy demo CSS and JSON files
console.log('📦 Copying demo assets...');
try {
    // Copy CSS
    if (fs.existsSync(path.join(demosPath, 'css'))) {
        fs.copySync(
            path.join(demosPath, 'css'),
            path.join(docsPath, 'css'),
            { overwrite: true }
        );
        console.log('  ✓ Copied demo CSS');
    }
} catch (err) {
    console.error('❌ Error copying demo assets:', err);
}

// Inject jQuery into all HTML files
console.log('💉 Injecting jQuery...');
const htmlFiles = glob.sync(path.join(docsPath, '**/*.html'));
const jqueryScript = '<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>';

let injectedCount = 0;
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Only inject if jQuery is not already present
    if (!content.includes('jquery') && !content.includes('jQuery')) {
        // Insert jQuery before the closing </head> tag
        content = content.replace('</head>', `    ${jqueryScript}\n</head>`);
        fs.writeFileSync(file, content);
        injectedCount++;
    }
});

console.log(`  ✓ jQuery injected into ${injectedCount} HTML files`);
console.log('✅ Documentation sync complete!');

module.exports = async function() {
    return Promise.resolve();
};
