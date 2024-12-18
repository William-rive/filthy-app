import React from 'react';
import { Tune } from '../../../models/TuneModel';
import TuneCard from './TuneCard';

interface TuneListProps {
    tunes: Tune[];
    onSelect: (id: string) => void;
}

const TuneList: React.FC<TuneListProps> = ({ tunes, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tunes.map((tune) => (
                <TuneCard key={tune.id} tune={tune} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default TuneList;