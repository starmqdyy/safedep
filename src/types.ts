export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

export type ChangeType = 'added' | 'removed' | 'updated';

export type DependencySection = 'dependencies' | 'devDependencies';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';

export type VersionChangeType = 'major' | 'minor' | 'patch' | null;

export interface DependencyChange {
  name: string;
  type: ChangeType;
  section: DependencySection;
  oldVersion?: string;
  newVersion?: string;
  risk: RiskLevel;
  versionChange?: VersionChangeType;
}

export interface CompareResult {
  changes: DependencyChange[];
  error?: string;
}
