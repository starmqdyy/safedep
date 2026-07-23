export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

export type ChangeType = 'added' | 'removed' | 'updated';

export type DependencySection = 'dependencies' | 'devDependencies';

export interface DependencyChange {
  name: string;
  type: ChangeType;
  section: DependencySection;
  oldVersion?: string;
  newVersion?: string;
}

export interface CompareResult {
  changes: DependencyChange[];
  error?: string;
}
