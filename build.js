import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // 1. Install frontend dependencies
  console.log('Installing frontend dependencies...');
  execSync('npm install', { cwd: path.resolve('frontend'), stdio: 'inherit' });

  // 2. Build frontend
  console.log('Building frontend...');
  execSync('npm run build', { cwd: path.resolve('frontend'), stdio: 'inherit' });

  // 3. Copy frontend/dist to root dist
  console.log('Copying build files to root dist...');
  const src = path.resolve('frontend/dist');
  const dest = path.resolve('dist');

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });

  // 4. Copy index.html to templates/index.html
  console.log('Copying index.html to templates/index.html...');
  fs.cpSync(path.join(dest, 'index.html'), path.join(dest, 'templates/index.html'));

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
