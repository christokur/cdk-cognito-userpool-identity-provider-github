const fs = require('fs');
const path = require('path');
const tsconfigPath = path.join(__dirname, '../tsconfig.json');

if (fs.existsSync(tsconfigPath)) {
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
    const tsconfig = JSON.parse(tsconfigContent);

    // Modify the tsconfig object as needed
    delete tsconfig.compilerOptions.charset;

    // Write the updated tsconfig back to the file
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('tsconfig.json has been patched successfully.');
} else {
    console.error('tsconfig.json file not found.');
}
