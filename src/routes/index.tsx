import { createFileRoute } from '@tanstack/react-router';
import { ZorroHome } from '@/components/zorro-home';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Zorro-X · Your world of trade' },
  { name: 'description', content: 'Explore export rules, verified services and finance, trade leads and learning for Indian exporters on Zorro-X.' },
  { property: 'og:title', content: 'Zorro-X · Your world of trade' },
  { property: 'og:description', content: 'Your products, your regions, your next trade connection. Export rules, trusted services and learning in one place.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: ZorroHome,
});
