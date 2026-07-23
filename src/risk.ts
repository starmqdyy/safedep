import semver from 'semver';
import { ChangeType, RiskLevel, VersionChangeType } from './types';

export interface RiskAnalysis {
  risk: RiskLevel;
  versionChange: VersionChangeType;
}

/**
 * Membantu membersihkan versi dari awalan seperti ^, ~, >= agar siap diproses semver.
 */
function cleanVersion(versionStr?: string): string | null {
  if (!versionStr) return null;
  try {
    const coerced = semver.coerce(versionStr);
    return coerced ? coerced.version : null;
  } catch {
    return null;
  }
}

/**
 * Menghitung tingkat risiko (RiskLevel) dan tipe perubahan versi (VersionChangeType).
 */
export function calculateRisk(
  type: ChangeType,
  oldVersion?: string,
  newVersion?: string
): RiskAnalysis {
  // Dependency ditambahkan atau dihapus secara otomatis berisiko MEDIUM
  if (type === 'added' || type === 'removed') {
    return {
      risk: 'MEDIUM',
      versionChange: null,
    };
  }

  // Dependency diperbarui
  if (type === 'updated') {
    const v1 = cleanVersion(oldVersion);
    const v2 = cleanVersion(newVersion);

    // Jika salah satu versi tidak valid / tidak dapat diproses
    if (!v1 || !v2) {
      return {
        risk: 'UNKNOWN',
        versionChange: null,
      };
    }

    try {
      const diff = semver.diff(v1, v2);

      if (!diff) {
        return {
          risk: 'UNKNOWN',
          versionChange: null,
        };
      }

      if (diff.includes('major')) {
        return { risk: 'HIGH', versionChange: 'major' };
      }
      if (diff.includes('minor')) {
        return { risk: 'MEDIUM', versionChange: 'minor' };
      }
      if (diff.includes('patch')) {
        return { risk: 'LOW', versionChange: 'patch' };
      }
    } catch {
      return {
        risk: 'UNKNOWN',
        versionChange: null,
      };
    }
  }

  return {
    risk: 'UNKNOWN',
    versionChange: null,
  };
}
