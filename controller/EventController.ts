import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer un événement
export const createEvent = async (title: string, description: string, date: Date, location: string) => {
  const event = await prisma.event.create({
    data: {
      title,
      description,
      date,
      location,
    },
  });
  return event;
};

// Modifier un événement
export const updateEvent = async (id: number, title: string, description: string, date: Date, location: string) => {
  const event = await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      date,
      location,
    },
  });
  return event;
};

// Supprimer un événement
export const deleteEvent = async (id: number) => {
  const event = await prisma.event.delete({
    where: { id },
  });
  return event;
};

// Lire un événement par ID
export const getEventById = async (id: number) => {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  };
  
  // Lire tous les événements
  export const getAllEvents = async () => {
    const events = await prisma.event.findMany();
    return events;
  };