import {Router} from "express";
import {getPageList} from "../../scrapbox";
import {Reaction, ReactionMongo, Record} from "../../share/data";
import {postToLinda} from "../../linda";
import {getReactions, insertReaction, insertRecord} from "../db";
import * as shortid from "shortid";

const router = Router();

router.get("/:tuplespace", async (req, res, next) => {
    const {tuplespace} = req.params;
    const data = {
        tupleSpace: JSON.stringify(tuplespace),
        pageList: JSON.stringify(await getPageList().catch(next)),
        reactions: JSON.stringify(await getReactions(tuplespace))
    };
    return res.render("index", data)
});

router.post("/reaction", async (req, res, next) => {
    const reactionParams: Reaction = req.body;

    //mongo
    const id: string = shortid.generate();
    const time: string = new Date().toISOString();
    const mongoParams: ReactionMongo = Object.assign({
        id: id,
        time: time,
        links: []
    }, reactionParams);
    insertReaction(mongoParams);

    //linda
    await postToLinda(Object.assign({
        type: "gyaon",
        isReaction: true
    }, mongoParams));
    res.status(200).end();
});

router.post("/record", async (req, res, next) => {
    const recordParams: Record = req.body;

    //mongo
    insertRecord(recordParams);

    //linda
    await postToLinda(Object.assign({
        type: "gyaon",
        isReaction: false
    }, recordParams));
    res.status(200).end();
});

export const routes = router;