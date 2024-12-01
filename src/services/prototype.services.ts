import {IPrototype} from '../models/prototype.model';
import{ Prototype } from '../models/prototype.model';
import { prototypeType} from '../schemas/prototype.schema';

export const createPrototype = async (prototypeDetails: prototypeType) => {
    try{
        const prototype = new Prototype ({
            ideaId: prototypeDetails.ideaId,
            prototypeUrl: prototypeDetails.prototypeUrl,
            status: prototypeDetails.status,
            developerId: prototypeDetails.developerId
        });
        const newPrototype = await prototype.save();
        return newPrototype;
    }catch(err:any){
        throw new Error(err);
    }
}

export const getPrototypes = async () => {
    try{
        const prototypes = await Prototype.find();
        return prototypes;
    }catch(err:any){
        throw new Error(err);
    }
}

export const getPrototype = async (id: string) => {
    try{
        const prototype = await Prototype.findById(id);
        return prototype;
    }catch(err:any){
        throw new Error(err);
    }
}

export const getPrototypesByIdea = async (ideaId: string) => {
    try{
        const prototypes = await Prototype.find({ideaId});
        return prototypes;
    }catch(err:any){
        throw new Error(err);
    }
}

export const getProtypeByDeveloper = async (developerId: string) => {
    try{
        const prototype = await Prototype.findOne({developerId});
        return prototype;
    }catch(err:any){
        throw new Error(err);
    }
}
