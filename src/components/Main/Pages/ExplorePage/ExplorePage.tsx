import ErrorPopup from '../../Popup/ErrorPopup/ErrorPopup'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BreedCard from '../../BreedCard/BreedCard'
import { breeds } from '../../../../data/breeds'
import pawIcon from '../../../../images/paw-icon.png'
import type { ApiBreed } from '../../../../types/types'
import { getBreeds } from '../../../../utils/catFactsApi'
import { describeBreed } from '../../../../utils/describeBreed'
import CatFact from './CatFact'
import '../../../../styles/ExplorePage.css'

const SEARCH_RESULTS_PER_BATCH = 6

function describeApiBreed(breed: ApiBreed) {
  return [
    breed.country && `Country: ${breed.country}`,
    breed.coat && `Coat: ${breed.coat}`,
    breed.pattern && `Pattern: ${breed.pattern}`,
  ].filter(Boolean).join(' · ')
}

function ExplorePage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(SEARCH_RESULTS_PER_BATCH)
  const [apiBreeds, setApiBreeds] = useState<ApiBreed[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)

  const selectedBreed = breeds.find((breed) => breed.id === searchParams.get('breed'))
  const apiBreedName = searchParams.get('apiBreed')
  const detailName = apiBreedName ?? selectedBreed?.name
  const selectedApiBreed = apiBreeds.find(
    ({ breed }) => breed.toLowerCase() === detailName?.toLowerCase(),
  )
  const detailLocalBreed = selectedBreed ?? breeds.find(
    ({ name }) => name.toLowerCase() === detailName?.toLowerCase(),
  )
  const isDetailView = Boolean(detailName)
  const searchTerm = query.trim().toLowerCase()
  const isSearching = !isDetailView && searchTerm.length > 0

  useEffect(() => {
    let ignoreResult = false

    getBreeds()
      .then((catalog) => {
        if (ignoreResult) return

        setApiBreeds(catalog)
        setStatus('ready')
      })
      .catch(() => {
        if (ignoreResult) return

        setStatus('error')
      })

    return () => {
      ignoreResult = true
    }
  }, [loadAttempt])

  const matches = isSearching
    ? apiBreeds.filter(({ breed }) => breed.toLowerCase().includes(searchTerm))
    : []

  return (
    <>
      <header className="explore-page__intro">
        <h1 className="page-title-with-paws">
          <img src={pawIcon} alt="" />
          <span>Explore Cats</span>
          <img src={pawIcon} alt="" />
        </h1>
        <p>Discover cat breeds and learn about their origins, coats, and patterns.</p>

        {isDetailView ? (
          <Link className="explore-page__all-breeds" to="/explore">
            <span aria-hidden="true">←</span> {apiBreedName && query ? 'Back to search results' : 'View all breeds'}
          </Link>
        ) : (
          <div className="explore-page__search">
            <label htmlFor="breed-search">Search breeds</label>
            <input
              id="breed-search"
              className="explore-page__search-input"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setVisibleCount(SEARCH_RESULTS_PER_BATCH)
              }}
              placeholder="e.g. Maine Coon"
            />
          </div>
        )}
      </header>

      {status === 'loading' && (
        <p className="explore-page__loading" role="status">
          <span className="explore-page__spinner" aria-hidden="true" />
          Loading breeds…
        </p>
      )}

      {status === 'error' && (
        <ErrorPopup
          title="We couldn’t load the breed catalog"
          onRetry={() => {
            setStatus('loading')
            setLoadAttempt((attempt) => attempt + 1)
          }}
        />
      )}

      {isSearching && status === 'ready' && matches.length === 0 && (
        <p role="status">No results found.</p>
      )}

      {detailName ? (
        selectedApiBreed || detailLocalBreed ? (
          <div className="breed-grid">
            <BreedCard
              name={selectedApiBreed?.breed ?? detailName}
              description={(selectedApiBreed && describeBreed(selectedApiBreed))
                || detailLocalBreed?.description || 'Breed details unavailable.'}
              image={detailLocalBreed?.image}
              compactWithoutPhoto
            >
              <CatFact key={detailName} />
            </BreedCard>
          </div>
        ) : status === 'ready' && <p role="status">Breed not found.</p>
      ) : isSearching ? (
        status === 'ready' && (
          <>
            <div className="breed-grid">
              {matches.slice(0, visibleCount).map((apiBreed) => {
                const localBreed = breeds.find(
                  ({ name }) => name.toLowerCase() === apiBreed.breed.toLowerCase(),
                )
                const details = describeApiBreed(apiBreed)

                return (
                  <BreedCard
                    key={apiBreed.breed}
                    name={apiBreed.breed}
                    description={details || localBreed?.description || 'Breed details unavailable.'}
                    image={localBreed?.image}
                    detailsTo={`/explore?apiBreed=${encodeURIComponent(apiBreed.breed)}`}
                  />
                )
              })}
            </div>
            {matches.length > visibleCount && (
              <button
                className="explore-page__show-more"
                type="button"
                onClick={() => setVisibleCount((count) => count + SEARCH_RESULTS_PER_BATCH)}
              >
                Show more <span aria-hidden="true">⌄</span>
              </button>
            )}
          </>
        )
      ) : (
        <div className="breed-grid">
          {breeds.map((breed) => {
            const apiBreed = apiBreeds.find(
              (item) => item.breed.toLowerCase() === breed.name.toLowerCase(),
            )

            return (
              <BreedCard
                key={breed.id}
                name={breed.name}
                description={(apiBreed && describeBreed(apiBreed)) || breed.description}
                image={breed.image}
                detailsTo={`/explore?breed=${breed.id}`}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default ExplorePage
