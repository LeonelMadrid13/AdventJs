import { decodeSantaPin } from './index.ts';
import { assertEquals, assertStrictEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('decodeSantaPin', () => {
  it('decodes a valid 4-digit PIN with increments/decrements', () => {
    const result = decodeSantaPin('[1++][2-][3+][<]');
    assertEquals(result, '3144');
  });

  it('decodes when wrap-around occurs with 9+ → 0 and 0- → 9', () => {
    const result = decodeSantaPin('[9+][0-][4][<]');
    assertEquals(result, '0944');
  });

  it('returns null if fewer than 4 digits are produced', () => {
    const result = decodeSantaPin('[1+][2-]');
    assertEquals(result, null);
  });

  it('returns null if there are no valid blocks', () => {
    assertStrictEquals(decodeSantaPin('no blocks'), null);
    assertStrictEquals(decodeSantaPin(''), null);
  });

  it('repeats the previous digit when encountering "<"', () => {
    const result = decodeSantaPin('[5][<][<][<]');
    // First digit = 5
    // Next digits repeat 5
    assertEquals(result, '5555');
  });

  it('ignores "<" when there is no previous digit', () => {
    const result = decodeSantaPin('[<][2][3][4]');
    // First block has no previous digit → skipped
    assertEquals(result, null); // null
  });

  it('returns null if more than 4 digits are produced', () => {
    const result = decodeSantaPin('[1][2][3][4][5]');
    assertEquals(result, null);
  });

  it('handles complex increment/decrement sequences', () => {
    const result = decodeSantaPin('[3+-+][4++--][7-+][<]');
    // Evaluate step-by-step:
    // [3+-+] → 3+ → 4, 4- → 3, 3+ → 4
    // [4++--] → 4+ → 5, 5+ → 6, 6- → 5, 5- → 4
    // [7-+] → 7- → 6, 6+ → 7
    // [<] repeat previous digit (7)
    assertEquals(result, '4477');
  });

  it('digit never becomes negative thanks to wrap-around logic', () => {
    const result = decodeSantaPin('[0---][1][2][3]');
    // [0---] → 0- → 9, 9- → 8, 8- → 7
    assertEquals(result, '7123');
  });

  it('handles multi-digit blocks by only using the first digit', () => {
    const result = decodeSantaPin('[9xyz+][1][2][3]');
    // First block → digit = 9 → then + → 0
    assertEquals(result, '0123');
  });
});
