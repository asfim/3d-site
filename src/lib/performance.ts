export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function getRecommendedQuality(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'high';
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) return 'low';
  
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 4) return 'medium';
  
  return 'high';
}
