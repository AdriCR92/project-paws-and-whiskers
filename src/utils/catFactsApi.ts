import type { ApiBreed, BreedsPage } from '../types/types'

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
