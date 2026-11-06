import { getCollection } from 'astro:content';
export async function projetsTries() {
  const tous = await getCollection('projets');
  return tous.sort((a, b) => a.data.ordre - b.data.ordre || a.data.titre.localeCompare(b.data.titre));
}
