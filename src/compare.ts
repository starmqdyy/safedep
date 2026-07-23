import fs from 'fs';
import { PackageJson, DependencyChange, DependencySection } from './types';

/**
 * Membaca file package.json dan mengembalikan objek PackageJson.
 * Melempar error jika file tidak ditemukan atau format JSON tidak valid.
 */
export function readPackageJson(filePath: string): PackageJson {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File tidak ditemukan: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  try {
    return JSON.parse(content) as PackageJson;
  } catch {
    throw new Error(`JSON tidak valid pada file: ${filePath}`);
  }
}

/**
 * Membandingkan dua objek dependencies (atau devDependencies) dan mendeteksi perubahan.
 */
export function compareDependencies(
  oldDeps: Record<string, string> = {},
  newDeps: Record<string, string> = {},
  section: DependencySection
): DependencyChange[] {
  const changes: DependencyChange[] = [];
  const allKeys = new Set([...Object.keys(oldDeps), ...Object.keys(newDeps)]);

  for (const name of allKeys) {
    const oldVersion = oldDeps[name];
    const newVersion = newDeps[name];

    // Dependency ditambahkan
    if (oldVersion === undefined && newVersion !== undefined) {
      changes.push({
        name,
        type: 'added',
        section,
        newVersion,
      });
    }
    // Dependency dihapus
    else if (oldVersion !== undefined && newVersion === undefined) {
      changes.push({
        name,
        type: 'removed',
        section,
        oldVersion,
      });
    }
    // Dependency versinya diperbarui
    else if (oldVersion !== undefined && newVersion !== undefined && oldVersion !== newVersion) {
      changes.push({
        name,
        type: 'updated',
        section,
        oldVersion,
        newVersion,
      });
    }
    // Jika versi sama (tidak berubah), diabaikan dan tidak dimasukkan ke dalam daftar
  }

  return changes;
}

/**
 * Membandingkan dua objek PackageJson secara keseluruhan (dependencies & devDependencies).
 */
export function comparePackages(
  oldPkg: PackageJson,
  newPkg: PackageJson
): DependencyChange[] {
  const depChanges = compareDependencies(
    oldPkg.dependencies || {},
    newPkg.dependencies || {},
    'dependencies'
  );

  const devDepChanges = compareDependencies(
    oldPkg.devDependencies || {},
    newPkg.devDependencies || {},
    'devDependencies'
  );

  return [...depChanges, ...devDepChanges];
}

/**
 * Membaca dua file package.json dari path dan mengembalikan daftar perubahannya.
 */
export function comparePackageFiles(oldPath: string, newPath: string): DependencyChange[] {
  const oldPkg = readPackageJson(oldPath);
  const newPkg = readPackageJson(newPath);
  return comparePackages(oldPkg, newPkg);
}
