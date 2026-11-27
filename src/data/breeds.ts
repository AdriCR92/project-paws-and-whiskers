import maineCoonPhoto from '../images/maine-coon.jpeg'
import siamesePhoto from '../images/siamese.jpeg'
import britishPhoto from '../images/british-shorthair.jpeg'
import type { Breed } from '../types/types'

export const breeds: readonly Breed[] = [
  {
    id: 'maine-coon',
    name: 'Maine Coon',
    description: 'A large, long-haired cat with a bushy tail.',
    image: { src: maineCoonPhoto, alt: 'Brown Maine Coon with long fur and tufted ears.' },
  },
  {
    id: 'siamese',
    name: 'Siamese',
    description: 'A short-haired cat with blue eyes and darker coloring on the face, ears, paws, and tail.',
    image: { src: siamesePhoto, alt: 'Blue-eyed Siamese cat resting against a dusty pink background.'},
  },
  {
    id: 'british-shorthair',
    name: 'British Shorthair',
    description: 'A sturdy cat with a round face and a dense, plush coat.',
    image: { src: britishPhoto, alt: 'Gray British shorthair cat siting close to a window.'},
  },
]
