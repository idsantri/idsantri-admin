import fs from 'node:fs';
import path from 'node:path';
// import { pathToFileURL } from 'node:url'

const brand = process.argv[2] || process.env.BRAND || 'demo';

const rootDir = process.cwd();
const brandDir = path.resolve(rootDir, 'brands', brand);

if (!fs.existsSync(brandDir)) {
	console.error(`\n❌ Brand "${brand}" tidak ditemukan di ${brandDir}!\n`);
	process.exit(1);
}

console.log(`\n🚀 [Brand Setup] Menyiapkan aset untuk "${brand}"...`);

// 1. Copy config -> src/config
const configSrc = path.resolve(brandDir, 'config');
const configDest = path.resolve(rootDir, 'src', 'config');
if (fs.existsSync(configSrc)) {
	fs.cpSync(configSrc, configDest, { recursive: true, force: true });
	console.log(`  ✔ Config disalin ke src/config/`);
}

// 2. Copy assets -> src/assets
const assetsSrc = path.resolve(brandDir, 'assets');
const assetsDest = path.resolve(rootDir, 'src', 'assets');
if (fs.existsSync(assetsSrc)) {
	fs.cpSync(assetsSrc, assetsDest, { recursive: true, force: true });
	console.log(`  ✔ Assets disalin ke src/assets/`);
}

// 3. Copy public -> public (icons, favicon, etc.)
const publicSrc = path.resolve(brandDir, 'public');
const publicDest = path.resolve(rootDir, 'public');
if (fs.existsSync(publicSrc)) {
	fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
	console.log(`  ✔ Public icons & favicon disalin ke public/`);
}

// 4. Update PWA Manifest (src-pwa/manifest.json)
// const pwaManifestPath = path.resolve(rootDir, 'src-pwa', 'manifest.json')
// const brandConfigPath = path.resolve(brandDir, 'config', 'index.js')

// if (fs.existsSync(pwaManifestPath) && fs.existsSync(brandConfigPath)) {
//   try {
//     const configUrl = pathToFileURL(brandConfigPath).href
//     const brandModule = await import(configUrl)
//     const brandConfig = brandModule.default || brandModule

//     const manifestRaw = fs.readFileSync(pwaManifestPath, 'utf-8')
//     const manifest = JSON.parse(manifestRaw)

//     if (brandConfig.name) manifest.name = brandConfig.name
//     if (brandConfig.sekolah) manifest.short_name = brandConfig.sekolah

//     fs.writeFileSync(pwaManifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
//     console.log(`  ✔ PWA manifest disesuaikan: name="${manifest.name}", short_name="${manifest.short_name}"`)
//   } catch (err) {
//     console.warn(`  ⚠️ Gagal memperbarui src-pwa/manifest.json:`, err.message)
//   }
// }

console.log(`✨ Sukses! Brand "${brand}" siap digunakan.\n`);
