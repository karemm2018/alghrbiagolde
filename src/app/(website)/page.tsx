import HomePageClient from '@/components/home/HomePageClient';
import { PROPERTIES, PROJECTS } from '@/lib/mockData';
import { getPropertiesListAdmin, getProjectsListAdmin } from '@/app/actions/properties';
import { normalizeProperty, normalizeProject } from '@/lib/normalizers';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Load live content before rendering so cards cannot be replaced mid-scroll.
  const [properties, projects] = await Promise.all([
    getPropertiesListAdmin(),
    getProjectsListAdmin(),
  ]);

  return (
    <HomePageClient
      properties={properties.length > 0 ? properties.map(normalizeProperty) : PROPERTIES}
      projects={projects.length > 0 ? projects.map(normalizeProject) : PROJECTS}
    />
  );
}
