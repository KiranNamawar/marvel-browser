import type { Theme } from './types/store';

class Store {
	#theme = $state<Theme>('dark');
	get theme(): Theme {
		return this.#theme;
	}
	set theme(nextTheme: Theme) {
		this.#theme = nextTheme;
		try {
			localStorage.setItem('theme', nextTheme);
		} catch {}
	}
}

export const store = new Store();
