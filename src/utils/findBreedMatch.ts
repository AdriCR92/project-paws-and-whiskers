import type { ApiBreed, MatchResult, QuizAnswers } from '../types/types'

const countriesByRegion: Record<string, readonly string[]> = {
  asia: [
    'arabian peninsula', 'burma', 'china', 'iran', 'japan', 'myanmar',
    'russia', 'singapore', 'south korea', 'taiwan', 'thailand', 'turkey',
  ],
  europe: [
    'cyprus', 'czech republic', 'czechia', 'denmark', 'england', 'finland', 'france',
    'germany', 'greece', 'isle of man', 'italy', 'malta', 'norway', 'russia',
    'scotland', 'spain', 'sweden', 'switzerland', 'turkey', 'ukraine',
    'united kingdom', 'wales',
  ],
  'north america': ['canada', 'mexico', 'united states', 'united states of america', 'usa'],
}

type Preference = {
  label: string
  matches: (breed: ApiBreed) => boolean
}

function normalize(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

export function findBreedMatch(
  catalog: readonly ApiBreed[],
  answers: QuizAnswers,
  seenBreeds: ReadonlySet<string> = new Set(),
): MatchResult | null {
  const preferences: Preference[] = []
  const { coat, pattern, country } = answers

  if (coat && coat !== 'No preference') {
    const length = normalize(coat).replace(/ hair$/, '')
    preferences.push({
      label: coat,
      matches: (breed) => normalize(breed.coat).split(/\s*(?:\/|,|\bor\b)\s*/).includes(length),
    })
  }

  if (pattern && pattern !== 'No preference') {
    const preferredPattern = normalize(pattern)
    const aliases = preferredPattern === 'pointed'
      ? /\b(?:pointed|colou?r[ -]?points?)\b/
      : preferredPattern === 'solid' ? /\bsolid\b/ : /\btabby\b/

    preferences.push({
      label: pattern,
      matches: (breed) => {
        const breedPattern = normalize(breed.pattern)
        const exceptions = /^all\s+(?:but|except)\s+(.+)$/.exec(breedPattern)

        if (exceptions) return !aliases.test(exceptions[1])
        return breedPattern === 'all' || aliases.test(breedPattern)
      },
    })
  }

  if (country && country !== 'Anywhere') {
    const countries = countriesByRegion[normalize(country)] ?? []
    preferences.push({
      label: country,
      matches: (breed) => normalize(breed.country)
        .split(/\s*(?:\/|,|;|\band\b|&)\s*/)
        .some((place) => countries.includes(place)),
    })
  }

  const bestMatches: MatchResult[] = []
  let bestScore = -1

  for (const breed of catalog) {
    if (!normalize(breed.breed)) continue

    const matchedPreferences = preferences.filter(({ matches }) => matches(breed)).map(({ label }) => label)
    const score = matchedPreferences.length
    if (score < bestScore || (preferences.length > 0 && score === 0)) continue

    if (score > bestScore) {
      bestMatches.length = 0
      bestScore = score
    }

    bestMatches.push({ breed, matchedPreferences, preferenceCount: preferences.length })
  }

  const unseen = bestMatches.filter(({ breed }) => !seenBreeds.has(breed.breed))
  const lastBreed = Array.from(seenBreeds).at(-1)
  const nextRound = bestMatches.filter(({ breed }) => breed.breed !== lastBreed)
  const candidates = unseen.length ? unseen : nextRound.length ? nextRound : bestMatches

  return candidates[Math.floor(Math.random() * candidates.length)] ?? null
}
