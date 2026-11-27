import type { ReactNode, Ref } from 'react'

export type Breed = {
  id: string
  name: string
  description: string
  image?: { src: string; alt: string }
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

export interface CatFactsPage {
  data: { fact: string; length: number }[];
}

export type BreedCardProps = {
  name: string;
  description: string;
  detailsTo?: string;
  compactWithoutPhoto?: boolean;
  children?: ReactNode;
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

export type QuizAnswers = Partial<Record<'coat' | 'pattern' | 'country', string>>

export type MatchResult = {
  breed: ApiBreed
  matchedPreferences: string[]
  preferenceCount: number
}

export type MatchResultPopupProps = {
  dialogRef: Ref<HTMLDialogElement>
  result: MatchResult | null
  onRetake: () => void
}
