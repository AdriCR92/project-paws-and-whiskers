import type { ApiBreed, BreedsPage, CatFactsPage } from '../types/types'

const BREEDS_URL = "https://catfact.ninja/breeds";

export async function getBreeds(): Promise<ApiBreed[]> {
  const breeds: ApiBreed[] = [];
  let nextPageUrl: string | null = BREEDS_URL;

  while (nextPageUrl !== null) {
    const response = await fetch(nextPageUrl);

    if (!response.ok) {
      throw new Error(`Failed to load breeds (${response.status}).`);
    }

    const page: BreedsPage = await response.json();

    breeds.push(...page.data);
    nextPageUrl = page.next_page_url;
  }

  return breeds;
}

export async function getCatFact(signal: AbortSignal): Promise<string> {
  const response = await fetch('https://catfact.ninja/facts', { signal });

  if (!response.ok) {
    throw new Error(`Failed to load cat facts (${response.status}).`);
  }

  const page: CatFactsPage = await response.json();
  const facts = page.data.map(({ fact }) => fact.trim()).filter(Boolean);
  const fact = facts[Math.floor(Math.random() * facts.length)];

  if (!fact) throw new Error('No cat facts available.');
  return fact;
}
