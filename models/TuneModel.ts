import { Tag } from './TagModel';

export interface Tune {
    id: string;
    name: string;
    description: string;
    code: string;
    createdAt: Date;
    postedBy: string;
    updatedAt: Date;
    tags: TuneTag[];
}

export interface TuneTag {
    tuneId: string;
    tagId: string;
    tune: Tune;
    tag: Tag;
}
