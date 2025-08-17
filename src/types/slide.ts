export interface SlideImage {
  url: string;
  alt: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'background';
  lazy?: boolean;
}

export interface SlideCode {
  title: string;
  filename?: string;
  language: 'typescript' | 'javascript' | 'css' | 'html' | 'json';
  code: string;
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
  slideAnimations?: SlideAnimations;
  backgroundAnimation?: BackgroundAnimation;
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
