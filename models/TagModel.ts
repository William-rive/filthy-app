import { TuneTag } from './TuneModel';

export interface Tag {
    id: string;
    name: string;
    tunes: TuneTag[];
}