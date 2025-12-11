import { manufactureGifts } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('manufactureGifts', () => {
  it('creates the correct number of toys according to quantities', () => {
    const production = [
      { toy: 'car', quantity: 3 },
      { toy: 'doll', quantity: 1 },
      { toy: 'ball', quantity: 2 }
    ];

    const result = manufactureGifts(production);

    assertEquals(result, [
      'car', 'car', 'car',
      'doll',
      'ball', 'ball'
    ]);
  });

  it('ignores toys with quantity <= 0', () => {
    const production = [
      { toy: 'train', quantity: 0 },
      { toy: 'bear', quantity: -2 },
      { toy: 'puzzle', quantity: 1 }
    ];

    const result = manufactureGifts(production);

    assertEquals(result, ['puzzle']);
  });

  it('returns an empty array when the input list is empty', () => {
    const production: Array<{ toy: string; quantity: number }> = [];

    const result = manufactureGifts(production);

    assertEquals(result, []);
  });

  it('does not mutate the original production array', () => {
    const production = [
      { toy: 'plane', quantity: 2 }
    ];

    const copy = JSON.parse(JSON.stringify(production));

    manufactureGifts(production);

    assertEquals(production, copy);
  });

  it('handles large quantities correctly', () => {
    const production = [
      { toy: 'coin', quantity: 5 }
    ];

    const result = manufactureGifts(production);

    assertEquals(result, ['coin', 'coin', 'coin', 'coin', 'coin']);
  });

  it('handles mixed valid and invalid quantities', () => {
    const production = [
      { toy: 'robot', quantity: 2 },
      { toy: 'truck', quantity: 0 },
      { toy: 'drone', quantity: -1 },
      { toy: 'kite', quantity: 1 }
    ];

    const result = manufactureGifts(production);

    assertEquals(result, ['robot', 'robot', 'kite']);
  });
});
