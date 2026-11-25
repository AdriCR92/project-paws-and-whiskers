import maineCoonPhoto from '../images/maine-coon.jpeg'
import siamesePhoto from '../images/siamese.jpeg'
import britishPhoto from '../images/british-shorthair.jpeg'

export type Breed = {
  id: string
  name: string
  description: string
  image?: { src: string; alt: string }
  quizProfile: readonly [number, number, number, number]
  matchSummary: string
}

export const breeds: readonly Breed[] = [
  {
    id: 'maine-coon',
    name: 'Maine Coon',
    description: 'A large, long-haired cat with a bushy tail.',
    image: { src: maineCoonPhoto, alt: 'Brown Maine Coon with long fur and tufted ears.' },
    quizProfile: [1, 1, 2, 1],
    matchSummary: 'A companion to explore if you enjoy a mix of play and downtime and have time for regular brushing.',
  },
  {
    id: 'siamese',
    name: 'Siamese',
    description: 'A short-haired cat with blue eyes and darker coloring on the face, ears, paws, and tail.',
    image: { src: siamesePhoto, alt: 'Blue-eyed Siamese cat resting against a dusty pink background.'},
    quizProfile: [2, 2, 0, 2],
    matchSummary: 'A companion to explore if you enjoy interactive play and want a cat who likes to stay close.',
  },
  {
    id: 'british-shorthair',
    name: 'British Shorthair',
    description: 'A sturdy cat with a round face and a dense, plush coat.',
    image: { src: britishPhoto, alt: 'Gray British shorthair cat siting close to a window.'},
    quizProfile: [0, 0, 1, 0],
    matchSummary: 'A companion to explore if you prefer quiet days and a cat who enjoys their own space.',
  },
]

export function findBreedMatch(answers: number[]) {
  const distance = (breed: Breed) => breed.quizProfile.reduce(
    (total, preference, index) => total + Math.abs(preference - answers[index]),
    0,
  )

  return breeds.reduce((best, breed) => distance(breed) < distance(best) ? breed : best)
}
