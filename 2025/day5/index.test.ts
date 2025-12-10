import { timeUntilTakeOff } from './index.ts';
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('timeUntilTakeOff', () => {
  const takeoff = '2025*12*25@00|00|00 NP';

  it('returns the correct positive difference when before takeoff', () => {
    const result = timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff);
    assertEquals(result, 30);
  });

  it('returns 0 when the time is exactly the takeoff time', () => {
    const result = timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff);
    assertEquals(result, 0);
  });

  it('returns a negative value when after takeoff', () => {
    const result = timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff);
    assertEquals(result, -12);
  });

  it('handles different days correctly', () => {
    const result = timeUntilTakeOff('2025*12*20@00|00|00 NP', takeoff);
    // 5 days difference → 5 × 24 × 60 × 60 = 432000 seconds
    assertEquals(result, 432000);
  });

  it('handles different months correctly', () => {
    const result = timeUntilTakeOff('2025*11*25@00|00|00 NP', takeoff);
    // 30 days difference (Nov 25 → Dec 25) = 2,592,000 seconds
    assertEquals(result, 2592000);
  });

  it('correctly parses and formats the ElfDateTime structure', () => {
    const result = timeUntilTakeOff('2025*01*01@12|30|15 NP', '2025*01*01@12|30|20 NP');
    assertEquals(result, 5);
  });

  it('supports negative differences with a wide range', () => {
    const result = timeUntilTakeOff('2025*12*25@01|00|00 NP', takeoff);
    // 1 hour after takeoff → -3600 seconds
    assertEquals(result, -3600);
  });

  it('handles boundary second transitions', () => {
    const result = timeUntilTakeOff('2025*12*24@23|59|59 NP', takeoff);
    // 1 second until takeoff
    assertEquals(result, 1);
  });
});
