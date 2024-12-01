import IIDEA from '../models/idea.model';
import Idea from '../models/idea.model';
import { ideaType } from '../schemas/idea.schema';

export const createIdea = async (ideaDetails: ideaType) => {
    try {
        const idea = new Idea({
            title: ideaDetails.title,
            description: ideaDetails.description,
            category: ideaDetails.category,
            status: ideaDetails.status,
            resourcesRequired: ideaDetails.resourcesRequired,
            createdAt: new Date(),
            updatedAt: new Date(),
            creatorId: ideaDetails.creatorId
        });
        const newIdea = await idea.save();
        return newIdea;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const getIdea = async (id: string) => {
    try {
        const idea = await Idea.findById(id);
        return idea;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const addResources = async (id: string, resources: string[]) => {
    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            throw new Error('Idea not found');
        }
        idea.resourcesRequired = idea.resourcesRequired.concat(resources);
        const updatedIdea = await idea.save();
        return updatedIdea;
    }
    catch (err: any) {
        throw new Error(err);
    }
}

export const updateIdea = async (id: string, ideaDetails: ideaType) => {
    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            throw new Error('Idea not found');
        }
        idea.title = ideaDetails.title;
        idea.description = ideaDetails.description;
        idea.category = ideaDetails.category;
        idea.status = ideaDetails.status;
        idea.resourcesRequired = ideaDetails.resourcesRequired;
        idea.updatedAt = new Date();
        const updatedIdea = await idea.save();
        return updatedIdea;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const deleteIdea = async (id: string) => {
    try {
        const idea = await Idea.findByIdAndDelete(id);
        return idea;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const getAllIdeas = async () => {
    try {
        const ideas = await Idea.find();
        return ideas;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const getIdeasByCategory = async (category: string) => {
    try {
        const ideas = await Idea.find({ category: category });
        return ideas;
    }
    catch (err: any) {
        throw new Error(err);
    }
}

export const getIdeasByStatus = async (status: string) => {
    try {
        const ideas = await Idea.find({ status: status });
        return ideas;
    }
    catch (err: any) {
        throw new Error(err);
    }
}

export const getIdeasByCreator = async (creatorId: string) => {
    try {
        const ideas = await Idea.find({ creatorId: creatorId });
        return ideas;
    }
    catch (err: any) {
        throw new Error(err);
    }
}


