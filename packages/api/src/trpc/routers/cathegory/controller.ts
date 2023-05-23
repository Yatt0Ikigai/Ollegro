import { Context } from '../../root';
import { getCathegories } from "../../utils/cathegoryUtils";



export const getCathegoriesHandler = async () => {
    const cathegories = await getCathegories({});
    return cathegories;
}

