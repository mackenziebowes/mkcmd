# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2025-12-30
### Added
- `CHANGELOG.md` for tracking changes

### Changed
- Simplified `file-utils.ts` by removing path caching (was causing issues with non-existent directories)

### Fixed
- Directory creation bug: `realpath()` now replaced with `resolve()` to handle new target directories
- Path resolution in bundled code for version command

### Removed
- Path caching in `file-utils.ts` (unnecessary optimization causing failures)
- Removed unused imports in `src/functions/orchestrate-scaffold.ts` to lint warnings

## [0.2.0] - 2025-12-30

### Added
- Build system with `bun build --target=bun`
- Build scripts: `build`, `build:exe`, `prepack`
- npm package preparation (removed `private: true`)


### Changed
- Moved `typescript` from peerDependencies to devDependencies
- Updated package.json entry points to `./dist/index.js`
- Fixed `--version` command to use `process.cwd()` for package.json resolution

## [0.1.0] - 2025-12-30

### Added
- Initial CLI scaffolding tool
- Interactive project setup with `@clack/prompts`
- Full CLI scaffold generation (package.json, tsconfig.json, README.md, core files)
- `FileBuilder` utility for indentation-aware code generation
- `file-utils` for path resolution and file writing
- Dynamic core file copying (all `.ts` files in `src/core/`)
- `init` command for scaffolding new CLI projects
- `--help` and `--version` flags
