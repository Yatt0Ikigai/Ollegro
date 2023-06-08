import { expect, test } from '@jest/globals';
import { getCathegoriesHandler } from "./controller"

test('getCathegories (empty db)', async() => {
    expect(await getCathegoriesHandler()).toEqual([])
})

