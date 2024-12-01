import mongoose from 'mongoose'

export interface IIdae {
    title: string;
    category:'Technology' | 'Agriculture' | 'Health' | 'Industry' | 'Economy' | 'Community Service' |'Education' |'Energy';
    description:string;
    status:'draft'|'submitted'|'funded';
    resourcesRequired:string [];
    craetedAt:Date;
    updatedAt:Date;
    creatorId:mongoose.Schema.Types.ObjectId;
}

const ideaSchema =new mongoose.Schema({
title:{type:String, required:true,},
description:{type:String, required:true},
category:{type:String,required:true, enum:['Technology','Agriculture','Health','Industry','Economy','Community Service','Education','Energy']},
status:{type:String,required:true, enum:['draft','submitted','funded']},
resourcesRequired:{type:[String],required:true},
createdAt:{type:Date,required:true},
updatedAt:{type:Date,required:true},
creatorId:{type:mongoose.Schema.Types.ObjectId,required:true}
});

const Idea = mongoose.model<IIdae>('Idea',ideaSchema);

export default Idea;