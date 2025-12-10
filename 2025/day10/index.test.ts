import { maxDepth } from './index.ts'
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('maxDepth', () => {
  
  it('[] → depth 1', () => {
    assertEquals(maxDepth('[]'), 1)
  })

  it('[[]] → depth 2', () => {
    assertEquals(maxDepth('[[]]'), 2)
  })

  it('[][] → depth 1', () => {
    assertEquals(maxDepth('[][]'), 1)
  })

  it('[[][]] → depth 2', () => {
    assertEquals(maxDepth('[[][]]'), 2)
  })

  it('[[[]]] → depth 3', () => {
    assertEquals(maxDepth('[[[]]]'), 3)
  })

  it('[][[]][] → depth 2', () => {
    assertEquals(maxDepth('[][[]][]'), 2)
  })

  // --- invalid cases ---

  it('"][" → invalid → -1', () => {
    assertEquals(maxDepth(']['), -1)
  })

  it('[[[ → invalid → -1', () => {
    assertEquals(maxDepth('[[['), -1)
  })

  it('"]]]" → invalid → -1', () => {
    assertEquals(maxDepth('[]]]'), -1)
  })

  it('"[][][" → invalid → -1', () => {
    assertEquals(maxDepth('[][]['), -1)
  })

  // --- extra robustness cases ---

  it('empty string → depth 0', () => {
    assertEquals(maxDepth(''), 0)
  })

  it('no brackets → depth 0', () => {
    assertEquals(maxDepth('abcdef'), 0)
  })

  it('nested alternating pattern → depth 3', () => {
    assertEquals(maxDepth('[[][[]]]'), 3)
  })

  it('closing more than opening mid-string → -1', () => {
    assertEquals(maxDepth('[[]]]]'), -1)
  })

})
