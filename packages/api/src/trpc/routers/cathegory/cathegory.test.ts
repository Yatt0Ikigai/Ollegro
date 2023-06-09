import { expect, test } from '@jest/globals';
import { getCathegoriesHandler } from "./controller"
import { cathegoryCars } from '../../../jest/cathegoriesDetails';
import appRouter, { AppRouter } from "../../root";
import { inferProcedureInput } from "@trpc/server";


test('getCathegories (carsCathegory in db)', async() => {
    const caller = appRouter.createCaller({});
    const cathegories = await caller.cathegory.getCathegories();
    expect(cathegories.offert).toEqual([cathegoryCars])
})

