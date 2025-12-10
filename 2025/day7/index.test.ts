import { drawTree } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('drawTree', () => {

  it('draws a tree of height 5 with ornament "o" every 2 positions', () => {
    const result = drawTree(5, 'o', 2);

    const expected = [
      '    *',
      '   o*o',
      '  *o*o*',
      ' o*o*o*o',
      '*o*o*o*o*',
      '    #'
    ].join('\n');

    assertEquals(result, expected);
  });

  it('draws a tree of height 3 with ornament "@" every 3 positions', () => {
    const result = drawTree(3, '@', 3);

    const expected = [
      '  *',
      ' *@*',
      '*@**@',
      '  #'
    ].join('\n');

    assertEquals(result, expected);
  });

  it('places ornaments everywhere when frequency = 1', () => {
    const result = drawTree(4, '+', 1);

    const expected = [
      '   +',
      '  +++',
      ' +++++',
      '+++++++',
      '   #'
    ].join('\n');

     assertEquals(result, expected);
  });

  it('creates only stump when height = 1', () => {
    const result = drawTree(1, 'o', 5);

    const expected = [
      '*',
      '#'
    ].join('\n');

    assertEquals(result, expected);
  });

  it('ensures stump is centered correctly', () => {
    const result = drawTree(5, 'o', 2);

    const lines = result.split('\n');
    const stump = lines[lines.length - 1];

    assertEquals(stump, '    #'); // 4 spaces + #
  });

  it('handles large height trees', () => {
    const result = drawTree(7, 'x', 4);
    const lines = result.split('\n');

    assertEquals(lines.length, 8); // height + stump
    assertEquals(lines[0].trim(), '*'); // top always starts with *
    assertEquals(lines[7].includes('#'), true); // stump exists
  });

});
