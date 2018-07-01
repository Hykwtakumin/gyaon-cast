import {ReactionLinda, RecordLinda} from "../share/data";
import axios from "axios";

export const postToLinda = async (params: ReactionLinda|RecordLinda) => {
    const {tupleSpace} = params;
    await axios.post(`https://linda-server.herokuapp.com/${tupleSpace}`, `tuple=${JSON.stringify(params)}`);
};