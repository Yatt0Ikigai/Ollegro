import {test,expect} from "@jest/globals";
import appRouter, { AppRouter } from "../../root";
import { inferProcedureInput } from "@trpc/server";
import { updateUser } from "../../utils/userUtil";
import { userA } from "../../../jest/usersDetails";

test("authed deposit test", async() => {
    const caller = appRouter.createCaller({user: userA});
    
    await updateUser({id:"64831d9d1d32923a01b0e1c1"}, {ballance: 0});
    const addBalanceNumber = 200;

    type depositInput = inferProcedureInput<AppRouter["user"]["depositMoney"]>;
    const input:depositInput = addBalanceNumber

    const response = await caller.user.depositMoney(input);

    expect(response.currentBalance).toEqual(addBalanceNumber) 
})

test("notAuthed deposit test", async() => {
    const caller = appRouter.createCaller({});
    const addBalanceNumber = 200;

    type depositInput = inferProcedureInput<AppRouter["user"]["depositMoney"]>;
    const input:depositInput = addBalanceNumber

    try{
       const response = await caller.user.depositMoney(input);
    } catch{
        (error: {code: string}) => {
            expect(error).toContainEqual({
                code: "UNAUTHORIZED"
            })
        }
    }
})