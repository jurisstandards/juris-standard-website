const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('page.tsx') && file.includes('[id]')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir('./src/app/juris-index');
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\{\s*Icon:\s*Code2,\s*label:\s*"Website Seal"[\s\S]*?\},?\s*/g, '');
    c = c.replace('grid-cols-1 sm:grid-cols-3', 'grid-cols-1 sm:grid-cols-2');
    fs.writeFileSync(f, c);
});
console.log('Fixed pages.');
