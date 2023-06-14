import { Context } from '../../root';
import { getCathegories } from "../../utils/cathegoryUtils";
import { validateCatch } from '../../utils/catch';


export const getCathegoriesHandler = async () => {
    try {
        const cathegories = await getCathegories({});
        return {
            status: "success",
            cathegories
        };
    } catch (err) { validateCatch(err) }
}

