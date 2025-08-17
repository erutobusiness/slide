export interface SlideImage {
  url: string;
  alt: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'background';
  lazy?: boolean;
}

export interface SlideCode {
  title?: string;
  descriptions?: string[];
  filename?: string;
  language: string;
  code: string;
}

export interface ListGroup {
  title?: string;
  points: string[];
}

export interface SlideList {
  groups: ListGroup[];
}

export interface SlideAnimations {
  in?: {
    type: 'fade' | 'slide' | 'zoom';
    duration: number;
  };
  out?: {
    type: 'fade' | 'slide' | 'zoom';
    duration: number;
  };
}

export interface BackgroundAnimation {
  type: 'wave' | 'heart' | 'boom';
}

export interface Slide {
  id: string;
  title: string;
  descriptions?: string[];
  image?: SlideImage;
  codeExamples?: SlideCode[];
  /** Layout for multiple code examples: 'vertical' (stacked) or 'horizontal' (side-by-side) */
  codeLayout?: 'vertical' | 'horizontal';
  // grouped list / bullet groups (used by quiz and explanation slides)
  list?: SlideList;
  slideAnimations?: SlideAnimations;
  backgroundAnimation?: BackgroundAnimation;
  // arbitrary metadata to allow gradual schema additions without breaking
  meta?: Record<string, unknown>;
}

export interface SlideSection {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
}

export interface Presentation {
  id: string;
  title: string;
  description: string;
  sections: SlideSection[];
}
