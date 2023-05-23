import { z } from 'zod';
import { t, authedProcedure, procedure } from "../../utils/[trpc]";

import { getCathegoriesHandler } from './controller';

const cathegoryRouter = t.router({
  getCathegories:
    procedure
      .query(async () => {
          const offert = await getCathegoriesHandler();
          return {
            status: "success",
            offert
          }
      }),
})


export default cathegoryRouter;