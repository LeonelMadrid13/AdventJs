import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { findUnsafeGifts } from "./index.ts";

Deno.test("Prueba 1 – todos los regalos están vigilados", () => {
  const warehouse = [
    ".*.",
    "*#*",
    ".*.",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 0);
});

Deno.test("Prueba 2 – un regalo sin cámaras alrededor", () => {
  const warehouse = [
    "...",
    ".*.",
    "...",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 1);
});

Deno.test("Prueba 3 – dos regalos sin cámaras", () => {
  const warehouse = [
    "*.*",
    "...",
    "*#*",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 2);
});

Deno.test("Prueba 4 – cuatro regalos sin cámaras (diagonales no cuentan)", () => {
  const warehouse = [
    ".....",
    ".*.*.",
    "..#..",
    ".*.*.",
    ".....",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 4);
});

Deno.test("Prueba 5 – regalo con múltiples cámaras alrededor pero solo cuenta una vez", () => {
  const warehouse = [
    ".#.",
    "#*#",
    ".#.",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 0);
});

Deno.test("Prueba 6 – cámara aparece antes que el regalo en el recorrido", () => {
  const warehouse = [
    "#*.",
    "...",
    "...",
  ];
  const result = findUnsafeGifts(warehouse);
  assertEquals(result, 0);
});
