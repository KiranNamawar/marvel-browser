import type { Image, ImageVariant } from '$lib/types/marvel';

export function getImageUrl(image: Image, variant: ImageVariant = 'detail'): string {
	return `${image.path}/${variant}.${image.extension}`;
}

export function isImageAvailable(image: Image): boolean {
	return !image.path.includes('image_not_available');
}