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
  comingSoon?: boolean;
};

export const SOURCE_REPO = "https://github.com/Bolu-Tife-dev/kinetix-studio";

export const RELEASE = {
  version: "1.0.0",
  codename: "Genesis",
  channel: "stable",
  releasedAt: "2026-10-13",
  notesUrl: `${SOURCE_REPO}/releases/tag/v1.0.0`,
  apiBase: "http://127.0.0.1:4815",
} as const;

const CDN = `${SOURCE_REPO}/releases/download/v${RELEASE.version}`;

export const SHA256SUMS_URL = `${CDN}/SHA256SUMS.txt`;

export const ARTIFACTS: Artifact[] = [
  {
    id: "win-x64-setup",
    os: "windows",
    arch: "x64",
    label: "Windows Installer",
    detail: "Windows 10 / 11 · x64 · NSIS installer",
    file: `Kinetix-Studio-Setup-${RELEASE.version}.exe`,
    format: "exe",
    size: "223 MB",
    sha256:
      "8ef4b2bef5fa56b5f5ffd9c941b525cbfb42cf6c5d7c49116e78f8e218b0925a",
    recommended: true,
  },
  {
    id: "win-x64-portable",
    os: "windows",
    arch: "x64",
    label: "Windows Portable",
    detail: "No install · runs from any folder",
    file: `Kinetix-Studio-${RELEASE.version}-portable.exe`,
    format: "exe",
    size: "223 MB",
    sha256:
      "a65eb60cdf131fcd0738492e76681fec6127424a5c4486d14d95c1cf50174ae6",
  },
  {
    id: "mac-universal",
    os: "macos",
    arch: "universal",
    label: "macOS · Universal",
    detail: "Apple Silicon & Intel · macOS 13 or newer",
    file: `Kinetix-Studio-${RELEASE.version}.dmg`,
    format: "dmg",
    size: "—",
    sha256: "",
    comingSoon: true,
  },
  {
    id: "linux-appimage",
    os: "linux",
    arch: "x64",
    label: "Linux AppImage",
    detail: "Any modern distro · glibc 2.31+",
    file: `Kinetix-Studio-${RELEASE.version}.AppImage`,
    format: "AppImage",
    size: "244 MB",
    sha256:
      "3044c11b7c44110b5a0a017e5e2b1176c7a1f303709767ede72cce877ef51bda",
    recommended: true,
  },
  {
    id: "linux-deb",
    os: "linux",
    arch: "x64",
    label: "Debian / Ubuntu",
    detail: "Ubuntu 22.04+ · Debian 12+",
    file: `kinetix-studio_${RELEASE.version}_amd64.deb`,
    format: "deb",
    size: "183 MB",
    sha256:
      "f49b0e36bfa6c5b350f9fa10055883466f59b08c341262a9188ff7aa110220a7",
  },
];

export const OS_META: Record<
  OsKey,
  { name: string; short: string; note: string }
> = {
  windows: { name: "Windows", short: "Win", note: "x86_64" },
  macos: { name: "macOS", short: "Mac", note: "coming soon" },
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
  const available = list.filter((a) => !a.comingSoon);
  return (
    available.find((a) => a.recommended) ??
    available[0] ??
    list.find((a) => a.recommended) ??
    list[0]
  );
}
