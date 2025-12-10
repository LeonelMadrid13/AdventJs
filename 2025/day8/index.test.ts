import { findUniqueToy } from './index.ts'
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('findUniqueToy', () => {
  it('returns first non-repeated character (case-insensitive) and keeps original case', () => {
    assertEquals(findUniqueToy('Gift'), 'G')
  })

  it('returns empty string when both characters are same case-insensitive', () => {
    assertEquals(findUniqueToy('sS'), '')
  })

  it('handles mixed-case repeated letters correctly', () => {
    assertEquals(findUniqueToy('reindeeR'), 'i')
  })

  it('returns empty when all letters appear twice (case-insensitive)', () => {
    assertEquals(findUniqueToy('AaBbCc'), '')
  })

  it('returns first unique letter when all are unique', () => {
    assertEquals(findUniqueToy('abcDEF'), 'a')
  })

  it('last character unique among many repeated mixed-case', () => {
    assertEquals(findUniqueToy('aAaAaAF'), 'F')
  })

  it('handles typical stress-test example', () => {
    assertEquals(findUniqueToy('sTreSS'), 'T')
  })

  it('single character string returns itself', () => {
    assertEquals(findUniqueToy('z'), 'z')
  })

  it('empty string returns empty result', () => {
    assertEquals(findUniqueToy(''), '')
  })

  it('works with non-letter characters as well', () => {
    assertEquals(findUniqueToy('1122334'), '4')
  })

  it('returns first unique even with accents or unicode', () => {
    assertEquals(findUniqueToy('áaÁ'), 'a') // both accented forms collapse differently
  })
})
