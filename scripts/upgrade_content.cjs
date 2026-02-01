const fs = require('fs');
const path = require('path');

// Args
const args = process.argv.slice(2);
const batchArg = args.find(arg => arg.startsWith('--batch='));
if (!batchArg) {
    console.error('Usage: node scripts/upgrade_content.cjs --batch=N');
    process.exit(1);
}

const batchId = batchArg.split('=')[1];
const batchFile = path.join(__dirname, 'batches', `batch_${batchId}.json`);
const modulesDir = path.join(__dirname, '../src/data/modules');

if (!fs.existsSync(batchFile)) {
    console.error(`Error: Batch file not found: ${batchFile}`);
    console.log('Please ensure the JSON content file exists before running the upgrade.');
    process.exit(1);
}

console.log(`Loading Batch ${batchId} from ${batchFile}...`);
const contentData = JSON.parse(fs.readFileSync(batchFile, 'utf8'));

let successCount = 0;

contentData.forEach(mod => {
    const targetPath = path.join(modulesDir, `${mod.id}.md`);
    if (fs.existsSync(targetPath)) {
        console.log(`Upgrading ${mod.id}...`);
        fs.writeFileSync(targetPath, mod.content);
        successCount++;
    } else {
        console.warn(`Warning: Target module ${mod.id} does not exist. Creating new.`);
        fs.writeFileSync(targetPath, mod.content);
        successCount++;
    }
});

console.log(`\n✅ Successfully upgraded ${successCount} modules in Batch ${batchId}.`);
