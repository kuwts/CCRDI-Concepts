// Social network name and Hugeicons icon for a profile URL, so link labels and
// icons match the link (e.g. "Jane on LinkedIn"). Unknown sites use the hostname.
const networks: { match: RegExp; name: string; icon: string }[] = [
  { match: /(^|\.)linkedin\.com$/, name: 'LinkedIn', icon: 'lucide:linkedin' },
  { match: /(^|\.)(x|twitter)\.com$/, name: 'X', icon: 'lucide:twitter' },
  { match: /(^|\.)instagram\.com$/, name: 'Instagram', icon: 'lucide:instagram' },
  { match: /(^|\.)(facebook|fb)\.com$/, name: 'Facebook', icon: 'lucide:facebook' },
  { match: /(^|\.)(youtube\.com|youtu\.be)$/, name: 'YouTube', icon: 'lucide:youtube' },
  { match: /(^|\.)github\.com$/, name: 'GitHub', icon: 'lucide:github' },
  { match: /(^|\.)dribbble\.com$/, name: 'Dribbble', icon: 'lucide:dribbble' },
  { match: /(^|\.)behance\.net$/, name: 'Behance', icon: 'lucide:link' },
  { match: /(^|\.)tiktok\.com$/, name: 'TikTok', icon: 'lucide:link' },
];

export function socialNetwork(url: string): { name: string; icon: string } {
  let host = '';
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return { name: 'website', icon: 'lucide:link' };
  }
  const hit = networks.find((n) => n.match.test(host));
  return hit ? { name: hit.name, icon: hit.icon } : { name: host, icon: 'lucide:link' };
}
