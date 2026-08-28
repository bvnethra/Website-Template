export async function generateStaticParams() { return [{ name: 'placeholder' }]; }
import { NextRequest, NextResponse } from 'next/server';

// Generates branded placeholder images as SVG
// This abstraction lets us swap to real images later without changing components
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const productName = decodeURIComponent(name);

  // Generate a consistent color from the product name
  let hash = 0;
  for (let i = 0; i < productName.length; i++) {
    hash = productName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hues = [165, 180, 195, 210, 225, 240, 150, 135, 170, 200];
  const hue = hues[Math.abs(hash) % hues.length];
  const saturation = 25 + (Math.abs(hash >> 4) % 20);
  const lightness = 88 + (Math.abs(hash >> 8) % 8);

  const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const iconColor = `hsl(${hue}, ${saturation + 20}%, ${lightness - 45}%)`;
  const textColor = `hsl(${hue}, ${saturation + 10}%, ${lightness - 55}%)`;

  // Wrap text for display
  const words = productName.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > 18) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim());

  const textLines = lines.slice(0, 3);
  const startY = 200 - (textLines.length * 14);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="${bgColor}" rx="12"/>
  <rect x="20" y="20" width="360" height="360" rx="8" fill="none" stroke="${iconColor}" stroke-width="1" opacity="0.2"/>

  <!-- Healthcare cross icon -->
  <g transform="translate(200, 150)" opacity="0.3">
    <rect x="-15" y="-40" width="30" height="80" rx="6" fill="${iconColor}"/>
    <rect x="-40" y="-15" width="80" height="30" rx="6" fill="${iconColor}"/>
  </g>

  <!-- Product name text -->
  ${textLines.map((line, i) => `<text x="200" y="${startY + 120 + i * 28}" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="${textColor}" text-anchor="middle">${escapeXml(line)}</text>`).join('\n  ')}

  <!-- MediNova watermark -->
  <text x="200" y="370" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="${iconColor}" text-anchor="middle" opacity="0.4">MediNova</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
