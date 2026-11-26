import type { ApiBreed } from '../types/types'

export function describeBreed(breed: ApiBreed) {
  const country = breed.country?.trim()
  const coat = breed.coat?.trim().toLowerCase()
  const place = country && /^(united states(?: of america)?|united kingdom|netherlands|philippines)$/i.test(country)
    ? `the ${country}`
    : country
  const coatDescription = coat === 'hairless' ? 'is hairless'
    : coat === 'short/long' ? 'comes in short- and long-haired varieties'
    : coat === 'short' || coat === 'long' || coat === 'semi-long' ? `has a ${coat} coat`
    : ''

  if (place && coatDescription) {
    return `Originally from ${place}, the ${breed.breed} ${coatDescription}.`
  }

  if (place) return `Originally from ${place}.`
  if (coatDescription) return `The ${breed.breed} ${coatDescription}.`
  return ''
}
