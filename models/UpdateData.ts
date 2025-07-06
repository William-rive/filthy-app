// Modèle pour les données de mise à jour des tunes
export type UpdateData = {
    name?: string;
    description?: string;
    code?: string;
    postedBy?: string;
    tags?: {
        deleteMany: object;
        create: Array<{
            tag: {
                connectOrCreate: {
                    where: { name: string };
                    create: { name: string };
                };
            };
        }>;
    };
};