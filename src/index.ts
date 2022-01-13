export default class Cache<K, V> {
	private readonly target: number;
	private readonly max: number;
	private readonly map = new Map<K, V>();

	constructor(target: number, max = Math.max(Math.round(target / 10), 1)) {
		if (max < target) {
			throw new Error(`Max muse be >= target`);
		}

		this.target = target;
		this.max = max;
	}

	public set(key: K, value: V, update = true): void {
		if (this.map.has(key)) {
			if (update) {
				this.map.delete(key);
			}
			this.map.set(key, value);
		} else if (this.map.set(key, value).size > this.max) {
			for (const key of this.map.keys()) {
				this.map.delete(key);

				if (this.map.size === this.target) {
					break;
				}
			}
		}
	}

	public has(key: K): boolean {
		return this.map.has(key);
	}

	public get(key: K, update = true): V | undefined {
		if (update) {
			if (this.map.has(key)) {
				const value = this.map.get(key) as V;

				this.map.delete(key);
				this.map.set(key, value);

				return value;
			}

			return;
		}

		return this.map.get(key);
	}

	public delete(key: K): boolean {
		return this.map.delete(key);
	}

	public clear(): void {
		this.map.clear();
	}

	public forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
		this.map.forEach(callback, thisArg);
	}

	public entries(): IterableIterator<[K, V]> {
		return this.map.entries();
	}

	public keys(): IterableIterator<K> {
		return this.map.keys();
	}
	public values(): IterableIterator<V> {
		return this.map.values();
	}

	public get size(): number {
		return this.map.size;
	}
}
