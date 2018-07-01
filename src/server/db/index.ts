import {MongoClient} from "mongodb"
import {Gyaon, ReactionMongo, Record} from "../../share/data";

require("dotenv").config();
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
let reaction;

MongoClient.connect(url, {useNewUrlParser: true}).then((client) => {
    console.log("connected mongo");
    const db = client.db(dbName);
    reaction = db.collection("reaction");
});

export const getReactions = async (tupleSpace: string): Promise<ReactionMongo[]> => {
    return await reaction.find({
        tupleSpace: tupleSpace
    }, {
        sort: {
            time: -1
        }
    }).toArray();
};

export const insertReaction = async (params: ReactionMongo): Promise<void> => await reaction.insertOne(params);

export const insertRecord = async (params: Record): Promise<void> => {
    const {user, title, url, reactionId} = params;
    const gyaon: Gyaon = {
        user: user,
        title: title,
        url: url
    };
    await reaction.findOneAndUpdate({
        id: reactionId
    }, {
        $push: {
            links: gyaon
        }
    }, {
        returnOriginal: false
    })
};
