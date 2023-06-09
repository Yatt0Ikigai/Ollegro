import {test,expect} from "@jest/globals";
import appRouter, { AppRouter } from "../../root";
import { inferProcedureInput } from "@trpc/server";
import { userA } from "../../../jest/usersDetails";
import { cathegoryCars } from "../../../jest/cathegoriesDetails";

test("authed create offert", async() => {
    const caller = appRouter.createCaller({user: userA});
    type offertInput = inferProcedureInput<AppRouter["offert"]["createOffert"]>;
    
    const base64ImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
    const input:offertInput = {
        cathegoryId: cathegoryCars.id,
        condition: "New",
        description: "Lorem",
        image: base64ImageUrl,
        price: 2790000.99,
        title: "Lambo"
    }

    const response = await caller.offert.createOffert(input);
    expect(response.offert).toMatchObject({
        ...(({ image, ...o }) => o)(input)
    }); 
})