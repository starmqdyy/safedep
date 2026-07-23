import path from 'path';
import { comparePackageFiles } from './compare';

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Penggunaan: npx tsx src/index.ts <package-old.json> <package-new.json>');
    console.log('Contoh: npx tsx src/index.ts ./examples/package-old.json ./examples/package-new.json');
    process.exit(1);
  }

  const oldPath = path.resolve(args[0]);
  const newPath = path.resolve(args[1]);

  try {
    const changes = comparePackageFiles(oldPath, newPath);

    console.log(`\n=== Hasil Perbandingan SafeDep ===`);
    console.log(`Lama: ${oldPath}`);
    console.log(`Baru: ${newPath}\n`);

    if (changes.length === 0) {
      console.log('Tidak ada perubahan dependency.');
      return;
    }

    const riskCounts = {
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
      UNKNOWN: 0,
    };

    changes.forEach((change) => {
      riskCounts[change.risk]++;

      const riskTag = `[${change.risk}]`.padEnd(9, ' ');

      if (change.type === 'added') {
        console.log(`${riskTag} [DITAMBAHKAN] ${change.name}@${change.newVersion} (${change.section})`);
      } else if (change.type === 'removed') {
        console.log(`${riskTag} [DIHAPUS]     ${change.name}@${change.oldVersion} (${change.section})`);
      } else if (change.type === 'updated') {
        console.log(`${riskTag} [DIPERBARUI]  ${change.name}: ${change.oldVersion} -> ${change.newVersion} (${change.section})`);
      }
    });

    console.log(`\nTotal Perubahan: ${changes.length}`);
    console.log(`\nRingkasan Risiko:`);
    console.log(`HIGH: ${riskCounts.HIGH}`);
    console.log(`MEDIUM: ${riskCounts.MEDIUM}`);
    console.log(`LOW: ${riskCounts.LOW}`);
    console.log(`UNKNOWN: ${riskCounts.UNKNOWN}\n`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Terjadi kesalahan yang tidak diketahui.');
    }
    process.exit(1);
  }
}

main();
