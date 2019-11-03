# Install typescript dependencies:
echo "[+] Installing typescript dependencies"
yarn add typescript @types/jest @types/react @types/react-native @types/react-redux @types/react-test-renderer

# Init tsconfig.json
echo "[+] Adding tsconfig.json"
echo '{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext",
    "noImplicitAny": false
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}' > tsconfig.json

# Create jest.config.js
echo "[+] Adding jest.config.json"
echo "module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};" > jest.config.js

# Rename *.js -> *.ts
echo "[+] Renaming *.js -> *.ts"

cd app/
for dir in $(find . -maxdepth 2 -type d); do
    for file in $dir/*.js; do
        if [ -e $file ]
        then
            mv $file $dir/$(basename $file .js).ts
        fi
    done
done

echo "[+] Adjusting *.ts -> *.tsx"
mv screens/IntroScreen/index.ts screens/IntroScreen/index.tsx
cd ..
mv App.js App.tsx
