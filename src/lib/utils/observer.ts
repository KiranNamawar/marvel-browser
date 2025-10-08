export function createObserver(node: HTMLElement, loadData: () => void) {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) loadData();
		},
		{
			threshold: 0.1,
			rootMargin: '100px'
		}
	);
	observer.observe(node);

	return observer.disconnect;
}
