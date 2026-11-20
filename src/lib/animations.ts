import gsap from 'gsap';

export function playEntranceFlash(element: HTMLElement, onComplete?: () => void) {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      onComplete
    }
  );
}

export function playExitFade(element: HTMLElement, onComplete?: () => void) {
  gsap.to(element, {
    opacity: 0,
    scale: 0.98,
    duration: 0.35,
    ease: 'power2.in',
    onComplete
  });
}
