#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const syncTasks = [
    {
        name: 'scripts',
        from: 'demos/build/',
        to: 'docs/scripts/'
    },
    {
        name: 'helpers',
        from: 'demos/helpers/',
        to: 'docs/scripts/'
    },
    {
        name: 'styles',
        from: 'demos/css/',
        to: 'docs/styles/'
    },
    {
        name: 'fonts',
        from: 'src/doc/template/static/fonts/',
        to: 'docs/fonts/'
    },
    {
        name: 'manifest',
        from: 'src/doc/template/manifest.json',
        to: 'docs/manifest.json'
    }
];

async function syncFiles() {
    console.log('🔄 Syncing documentation files...\n');

    for (const task of syncTasks) {
        try {
            const fromPath = path.resolve(task.from);
            const toPath = path.resolve(task.to);

            // Check if source exists
            if (!fs.existsSync(fromPath)) {
                console.log(`⚠️  Skipping ${task.name}: source not found (${fromPath})`);
                continue;
            }

            // Create destination directory if it doesn't exist
            const destDir = path.dirname(toPath);
            await fs.ensureDir(destDir);

            // Copy file or directory
            await fs.copy(fromPath, toPath, { overwrite: true });
            console.log(`✓ Synced ${task.name}: ${task.from} → ${task.to}`);
        } catch (error) {
            console.error(`✗ Error syncing ${task.name}:`, error.message);
        }
    }

    console.log('\n✅ Documentation sync complete!');
}

// Run if called directly
if (require.main === module) {
    syncFiles().catch(error => {
        console.error('Sync failed:', error);
        process.exit(1);
    });
}

module.exports = syncFiles;
