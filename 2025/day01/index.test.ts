import { filterGifts } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('filterGifts', () => {
  it('returns gifts that do not contain the "#" character', () => {
    const gifts = ['car', 'doll#arm', 'ball', '#train'];
    const result = filterGifts(gifts);
    assertEquals(result, ['car', 'ball']);
  });

  it('returns an empty array when all gifts contain "#"', () => {
    const gifts = ['#broken', '#rusty'];
    const result = filterGifts(gifts);
    assertEquals(result, []);
  });

  it('returns an empty array when input is empty', () => {
    const gifts: string[] = [];
    const result = filterGifts(gifts);
    assertEquals(result, []);
  });

  it('does not modify the original array', () => {
    const gifts = ['bike', 'drone#motor'];
    const originalCopy = [...gifts];

    filterGifts(gifts);

    assertEquals(gifts, originalCopy);
  });

  it('handles gifts containing "#" at any position', () => {
    const gifts = ['#a', 'b#', 'c#a', 'toy'];
    const result = filterGifts(gifts);
    assertEquals(result, ['toy']);
  });

  it('handles strings with multiple "#" characters', () => {
    const gifts = ['##broken', 'good##gift', 'nice'];
    const result = filterGifts(gifts);
    assertEquals(result, ['nice']);
  });
});
