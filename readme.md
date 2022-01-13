# KV LRU Cache

Key-value least-recently-used (LRU) cache module written in Typescript with zero dependencies.

## Installation

```sh
npm i kv-lru-cache
```

## Usage

```ts
import Cache from 'kv-lru-cache';

const cache = new Cache<string, number>(2, 3);

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4);

console.log(cache.get('a'));

// undefined

cache.clear();

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.get('a');
cache.set('d', 4);

console.log(cache.get('a'));

// 1
```
