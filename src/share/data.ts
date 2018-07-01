export type Sound = {
    url: string,
    title: string,
    keyboard: string
}

export type PageData = {
    title: string,
    sounds: Sound[]
}

export type ScrapBoxPageLine = {
    id: string,
    text: string,
    userId: string,
    created: number,
    updated: number
}

export type GyaonResponse = {
    endpoint: string,
    object: {
        key: string
    }
}

export type Gyaon = {
    user: string,
    title: string,
    url: string
}

export type Reaction = {
    tupleSpace: string
} & Gyaon

export type ReactionMongo = {
    id: string,
    links: Gyaon[],
    time: string //ISO8601
} & Reaction

export type Tuple = {
    type: string,
    isReaction: boolean
}

export type ReactionLinda = Tuple & ReactionMongo

export type Record = {
    tupleSpace: string,
    reactionId: string
} & Gyaon

export type RecordLinda = Tuple & Record

