import type { ReactNode, Ref } from 'react'

export type Breed = {
  id: string
  name: string
  description: string
  image?: { src: string; alt: string }
  quizProfile: readonly [number, number, number, number]
  matchSummary: string
}

export interface ApiBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

export interface BreedsPage {
  data: ApiBreed[];
  next_page_url: string | null;
}

export type BreedCardProps = {
  name: string;
  description: string;
  detailsTo?: string;
  compactWithoutPhoto?: boolean;
  image?: {
    src: string;
    alt: string;
  };
};

export type PopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  label: string
  children: ReactNode
  className?: string
  closeText?: string
}

export type ImagePopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  name: string
  src: string
  alt: string
}

export type MatchResultPopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  breed?: Breed
}
