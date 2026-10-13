export type OsKey = "windows" | "macos" | "linux";

export type Arch = "x64" | "arm64" | "universal";

export type Artifact = {
  id: string;
  os: OsKey;
  arch: Arch;
  label: string;
  detail: string;
  file: string;
  format: "exe" | "zip" | "dmg" | "AppImage" | "deb";
  size: string;
  sha256: string;
  recommended?: boolean;
  requires?: string;
};

export const RELEASE = {
  version: "2.4.1",
  codename: "Spectra",
  channel: "stable",
  releasedAt: "2026-09-28",
  notesUrl: "https://github.com/kinetix-studio/kinetix/releases/tag/v2.4.1",
  apiBase: "http://127.0.0.1:4721",
  mcpEndpoint: "http://127.0.0.1:4721/mcp",
} as const;

const CDN = `https://github.com/kinetix-studio/kinetix/releases/download/v${RELEASE.version}`;

export const ARTIFACTS: Artifact[] = [
  {
    id: "win-x64-setup",
    os: "windows",
    arch: "x64",
    label: "Windows Installer",
    detail: "Windows 10 / 11 · x64 · signed MSI + NSIS",
    file: `Kinetix-Studio-${RELEASE.version}-windows-x64-setup.exe`,
    format: "exe",
    size: "184 MB",
    sha256: "9f2c4b7e1ad38c05b6e94f21d7c8a30e5b19d4f7c6a2e8b30d5147a9ce2f6b8d",
    recommended: true,
  },
  {
    id: "win-x64-portable",
    os: "windows",
    arch: "x64",
    label: "Windows Portable",
    detail: "No install · runs from any folder",
    file: `Kinetix-Studio-${RELEASE.version}-windows-x64-portable.zip`,
    format: "zip",
    size: "191 MB",
    sha256: "3c81f0a94d6b2e75c18d9037af5e26410c9b8d47e2a15f6039cb7d8e4a12f05b",
  },
  {
    id: "mac-arm64",
    os: "macos",
    arch: "arm64",
    label: "macOS · Apple Silicon",
    detail: "M1 – M4 series · macOS 13 Ventura or newer",
    file: `Kinetix-Studio-${RELEASE.version}-macos-arm64.dmg`,
    format: "dmg",
    size: "176 MB",
    sha256: "b74e1c08a5d93f62e0187cb4d2f95a306e8c1d794b0a25e3f861dc970a4b5e2f",
    recommended: true,
  },
  {
    id: "mac-x64",
    os: "macos",
    arch: "x64",
    label: "macOS · Intel",
    detail: "Intel-based Macs · macOS 13 Ventura or newer",
    file: `Kinetix-Studio-${RELEASE.version}-macos-x64.dmg`,
    format: "dmg",
    size: "189 MB",
    sha256: "5a0d73e91c4b8f26d0a75e13b9c48f207d6a1e05c39b84f260ad7e13c59b4a80",
  },
  {
    id: "mac-universal",
    os: "macos",
    arch: "universal",
    label: "macOS · Universal",
    detail: "Single binary · both architectures",
    file: `Kinetix-Studio-${RELEASE.version}-macos-universal.dmg`,
    format: "dmg",
    size: "331 MB",
    sha256: "e18c4a70b5d29f36a0e71c84b3d5920f6a9e2c74d01b583f26ac9e07d4b13f5a",
  },
  {
    id: "linux-appimage",
    os: "linux",
    arch: "x64",
    label: "Linux AppImage",
    detail: "Any modern distro · glibc 2.31+",
    file: `Kinetix-Studio-${RELEASE.version}-linux-x86_64.AppImage`,
    format: "AppImage",
    size: "204 MB",
    sha256: "7d2f9c14a0e63b58c1a7d024e9b53f60d8c1a47e92b05f36d7a1e804c39b52fd",
    recommended: true,
  },
  {
    id: "linux-deb",
    os: "linux",
    arch: "x64",
    label: "Debian / Ubuntu",
    detail: "Ubuntu 22.04+ · Debian 12+",
    file: `kinetix-studio-${RELEASE.version}-amd64.deb`,
    format: "deb",
    size: "198 MB",
    sha256: "2b6e05d94a17c83f50e26d71b9c3a08f4e5d7210a96c38f5b02d7e14a83c69f0",
  },
];

export const OS_META: Record<
  OsKey,
  { name: string; short: string; note: string }
> = {
  windows: { name: "Windows", short: "Win", note: "x86_64" },
  macos: { name: "macOS", short: "Mac", note: "Apple Silicon & Intel" },
  linux: { name: "Linux", short: "Linux", note: "AppImage & .deb" },
};

export function downloadUrl(artifact: Artifact): string {
  return `${CDN}/${encodeURIComponent(artifact.file)}`;
}

export function artifactsFor(os: OsKey): Artifact[] {
  return ARTIFACTS.filter((a) => a.os === os);
}

export function detectOs(userAgent: string, platform: string): OsKey {
  const ua = userAgent.toLowerCase();
  const plat = platform.toLowerCase();

  if (/android/.test(ua)) return "linux";
  if (/iphone|ipad|ipod/.test(ua)) return "macos";

  if (/win/.test(plat) || /windows/.test(ua)) return "windows";
  if (/mac|darwin|iphone|ipad/.test(plat) || /mac os/.test(ua)) return "macos";
  if (/linux|x11|cros/.test(plat) || /linux|x11/.test(ua)) return "linux";

  return "windows";
}

export function primaryArtifactFor(os: OsKey): Artifact {
  const list = artifactsFor(os);
  return list.find((a) => a.recommended) ?? list[0];
}
