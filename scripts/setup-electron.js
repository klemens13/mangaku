const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');

// Baca package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update konfigurasi untuk Electron
packageJson.main = 'electron/main.js';

// Tambahkan scripts Electron
packageJson.scripts = {
  ...packageJson.scripts,
  'electron': 'electron electron/main.js',
  'electron-dev': 'concurrently "npm run dev" "wait-on http://localhost:3000 && electron electron/main.js"',
  'build-win': 'electron-builder --win --config electron-builder.yml',
  'build-mac': 'electron-builder --mac --config electron-builder.yml',
  'build-linux': 'electron-builder --linux --config electron-builder.yml',
  'build-all': 'electron-builder --win --mac --linux --config electron-builder.yml'
};

// Tambahkan konfigurasi build
packageJson.build = {
  appId: 'com.mangaku.app',
  productName: 'MangaKu',
  copyright: 'Copyright © 2024 MangaKu',
  directories: {
    output: 'release',
    buildResources: 'build'
  },
  files: [
    'dist/**/*',
    'electron/**/*',
    'public/**/*',
    'package.json'
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      },
      {
        target: 'portable',
        arch: ['x64']
      }
    ],
    icon: 'public/icon.svg',
    artifactName: '${productName}-${version}-Setup.${ext}'
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
    shortcutName: 'MangaKu',
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  },
  portable: {
    artifactName: '${productName}-${version}-Portable.${ext}'
  },
  mac: {
    target: ['dmg', 'zip'],
    icon: 'public/icon.svg',
    category: 'public.app-category.entertainment'
  },
  linux: {
    target: ['AppImage', 'deb'],
    icon: 'public/icon.svg',
    category: 'Graphics'
  }
};

// Tambahkan devDependencies jika belum ada
if (!packageJson.devDependencies) {
  packageJson.devDependencies = {};
}

// Simpan kembali
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ package.json berhasil diupdate untuk Electron!');
console.log('');
console.log('Script yang tersedia:');
console.log('  npm run electron        - Jalankan aplikasi desktop');
console.log('  npm run electron-dev    - Jalankan dengan hot-reload');
console.log('  npm run build-win       - Build installer Windows');
console.log('  npm run build-all       - Build untuk semua platform');
