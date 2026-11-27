import { useEffect, useState } from 'react'
import { getCatFact } from '../../../../utils/catFactsApi'
import pawIcon from '../../../../images/paw-icon.png'

export default function CatFact() {
  const [fact, setFact] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    getCatFact(controller.signal)
      .then((text) => {
        if (!controller.signal.aborted) setFact(text)
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true)
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="explore-page__fact">
      <h3>
        <img src={pawIcon} alt="" width={24} height={24} />
        Did you know?
      </h3>
      <p role="status">{failed ? 'Cat fact unavailable right now.' : fact || 'Loading a cat fact…'}</p>
    </section>
  )
}
