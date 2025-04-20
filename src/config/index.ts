import { Langbase } from "langbase";
import { KEYS } from "../keys";

export const langbase = new Langbase({
	apiKey: KEYS.LANGBASE_API,
});
