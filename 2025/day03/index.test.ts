import { drawGift } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('drawGift', () => {
  it('returns a square gift with borders when size = 4 and symbol = "*"', () => {
    const result = drawGift(4, '*');

    assertEquals(result,
      '****\n' +
      '*  *\n' +
      '*  *\n' +
      '****'
    );
  });

  it('returns the correct gift when size = 3 and symbol = "#"', () => {
    const result = drawGift(3, '#');

    assertEquals(result,
      '###\n' +
      '# #\n' +
      '###'
    );
  });

  it('returns a 2x2 solid square when size = 2', () => {
    const result = drawGift(2, '-');

    assertEquals(result,
      '--\n' +
      '--'
    );
  });

  it('returns an empty string when size < 2', () => {
    assertEquals(drawGift(1, '+'), '');
    assertEquals(drawGift(0, 'x'), '');
    assertEquals(drawGift(-5, '!'), '');
  });

  it('handles multi-character symbols correctly', () => {
    const result = drawGift(3, '💫');

    assertEquals(result,
      '💫💫💫\n' +
      '💫 💫\n' +
      '💫💫💫'
    );
  });

  it('produces correct dimensions: height equals size', () => {
    const size = 5;
    const result = drawGift(size, '*');

    const lines = result.split('\n');
    assertEquals(lines.length, size);
  });

  it('produces correct width: each line has length equal to size * symbol.length', () => {
    const size = 4;
    const symbol = '@';
    const result = drawGift(size, symbol);

    const expectedWidth = size * symbol.length;
    const lines = result.split('\n');

    for (const line of lines) {
      assertEquals(line.length, expectedWidth);
    }
  });
});
