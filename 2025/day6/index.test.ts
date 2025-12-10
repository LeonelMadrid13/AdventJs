import { matchGloves } from './index.ts';
import type { Glove } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('matchGloves', () => {
  it('returns matching pairs by color', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'red' },
      { hand: 'R', color: 'red' },
      { hand: 'L', color: 'blue' },
      { hand: 'R', color: 'blue' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, ['red', 'blue']);
  });

  it('returns multiple pairs of the same color when available', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'green' },
      { hand: 'R', color: 'green' },
      { hand: 'L', color: 'green' },
      { hand: 'R', color: 'green' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, ['green', 'green']);
  });

  it('ignores colors with no matching opposite hand', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'yellow' },
      { hand: 'L', color: 'yellow' },
      { hand: 'R', color: 'black' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, []);
  });

  it('handles uneven matching counts correctly', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'pink' },
      { hand: 'L', color: 'pink' },
      { hand: 'R', color: 'pink' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, ['pink']);
  });

  it('returns an empty array when input is empty', () => {
    const gloves: Glove[] = [];
    const result = matchGloves(gloves);
    assertEquals(result, []);
  });

  it('handles multiple colors with different pair counts', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'red' },
      { hand: 'R', color: 'red' },
      { hand: 'L', color: 'red' },
      { hand: 'R', color: 'blue' },
      { hand: 'L', color: 'blue' }
    ];

    const result = matchGloves(gloves);
    // red → 1 pair, blue → 1 pair
    assertEquals(result, ['red', 'blue']);
  });

  it('does not mix colors when pairing', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'red' },
      { hand: 'R', color: 'green' },
      { hand: 'L', color: 'green' },
      { hand: 'R', color: 'red' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, ['red', 'green']);
  });

  it('preserves insertion order of colors as they first appear', () => {
    const gloves: Glove[] = [
      { hand: 'L', color: 'blue' },
      { hand: 'L', color: 'red' },
      { hand: 'R', color: 'blue' },
      { hand: 'R', color: 'red' }
    ];

    const result = matchGloves(gloves);
    assertEquals(result, ['blue', 'red']);
  });
});
