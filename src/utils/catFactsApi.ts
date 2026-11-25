const BREEDS_URL = "https://catfact.ninja/breeds";

export interface ApiBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

interface BreedsPage {
  data: ApiBreed[];
  next_page_url: string | null;
}

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