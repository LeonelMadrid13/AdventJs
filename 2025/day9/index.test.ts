import { moveReno } from './index.ts'
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import {
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";

describe('moveReno', () => {

  const board = `
.....
.*#.**
.@...
.....
`;

  it('Prueba 1 (D): se mueve pero no recoge nada -> fail', () => {
    assertEquals(moveReno(board, 'D'), 'fail')
  })

  it('Prueba 2 (U): recoge el item y termina -> success', () => {
    assertEquals(moveReno(board, 'U'), 'success')
  })

  it('Prueba 3 (RU): choca con un obstáculo -> crash', () => {
    assertEquals(moveReno(board, 'RU'), 'crash')
  })

  it('Prueba 4 (RRRUU): llega a un * -> success', () => {
    assertEquals(moveReno(board, 'RRRUU'), 'success')
  })

  it('Prueba 5 (DD): se sale del board -> crash', () => {
    assertEquals(moveReno(board, 'DD'), 'crash')
  })

  it('Prueba 6 (UUU): recoge * y luego se estrella -> success (la recogida gana)', () => {
    assertEquals(moveReno(board, 'UUU'), 'success')
  })

  it('Prueba 7 (RR): no recoge nada -> fail', () => {
    assertEquals(moveReno(board, 'RR'), 'fail')
  })

  // ----- EXTRA TEST CASES -----

  it('Movimiento inválido devuelve fail', () => {
    assertEquals(moveReno(board, 'XZ'), 'fail')
  })

  it('No existe reno en board -> fail', () => {
    const noReno = `
.....
.....
.....
.....
`
    assertEquals(moveReno(noReno, 'RR'), 'fail')
  })

  it('Colisión inmediata a la izquierda del borde -> crash', () => {
    const localBoard = `
@....
.....
.....
`
    assertEquals(moveReno(localBoard, 'L'), 'crash')
  })

  it('Colisión inmediata contra obstáculo # -> crash', () => {
    const localBoard = `
@#...
.....
.....
`
    assertEquals(moveReno(localBoard, 'R'), 'crash')
  })

  it('Recolecta un * inmediatamente a la derecha -> success', () => {
    const localBoard = `
@*...
.....
.....
`
    assertEquals(moveReno(localBoard, 'R'), 'success')
  })

})
