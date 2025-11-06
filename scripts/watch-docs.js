#!/usr/bin/env node

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const syncFiles = require('./sync-docs');

function runCommand(command) {
    return new Promise((resolve, reject) => {
        console.log(`\n🔨 Running: ${command}`);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(stderr);
            }
            if (stdout) {
                console.log(stdout);
            }
            resolve();
        });
    });
}

async function rebuild(type) {
    console.log(`\n📝 ${type} changed, rebuilding docs...`);

    try {
        await runCommand('yarn run docs:generate');
        await syncFiles();
        console.log('✅ Rebuild complete!\n');
    } catch (error) {
        console.error('❌ Rebuild failed:', error.message);
    }
}

console.log('👀 Watching for documentation changes...\n');

// Watch patterns matching the original Grunt watch task
const watchers = {
    'README': {
        pattern: 'README.md',
        handler: () => rebuild('README')
    },
    'demos HTML': {
        pattern: 'demos/*.html',
        handler: () => rebuild('Demo HTML')
    },
    'demos JSON': {
        pattern: 'demos/*.json',
        handler: () => rebuild('Demo JSON')
    },
    'templates': {
        pattern: 'src/doc/template/tmpl/*.tmpl',
        handler: () => rebuild('Template')
    },
    'styles': {
        pattern: 'demos/css/**/*',
        handler: async () => {
            console.log('\n🎨 Styles changed, syncing...');
            await syncFiles();
        }
    },
    'fonts': {
        pattern: 'src/doc/template/static/fonts/**/*',
        handler: async () => {
            console.log('\n🔤 Fonts changed, syncing...');
            await syncFiles();
        }
    },
    'manifest': {
        pattern: 'src/doc/template/manifest.json',
        handler: async () => {
            console.log('\n📄 Manifest changed, syncing...');
            await syncFiles();
        }
    }
};

// Set up watchers
Object.entries(watchers).forEach(([name, config]) => {
    const watcher = chokidar.watch(config.pattern, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('change', config.handler);
    watcher.on('add', config.handler);

    console.log(`✓ Watching ${name}: ${config.pattern}`);
});

console.log('\n✅ All watchers active. Press Ctrl+C to stop.\n');
