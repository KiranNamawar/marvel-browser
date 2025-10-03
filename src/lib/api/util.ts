type ImageVariant =
	| 'detail'
	| 'portrait_small'
	| 'portrait_medium'
	| 'portrait_xlarge'
	| 'portrait_fantastic'
	| 'portrait_uncanny'
	| 'portrait_incredible'
	| 'standard_small'
	| 'standard_medium'
	| 'standard_large'
	| 'standard_xlarge'
	| 'standard_fantastic'
	| 'standard_amazing'
	| 'landscape_small'
	| 'landscape_medium'
	| 'landscape_large'
	| 'landscape_xlarge'
	| 'landscape_amazing'
	| 'landscape_incredible';

export function getImageUrl(
	path: string,
	extension: string,
	variant: ImageVariant = 'detail'
): string {
	return `${path}/${variant}.${extension}`;
}
