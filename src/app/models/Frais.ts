import { ArticleTap } from "./ArticleTap";
import { Task } from "./Tax";

export class Frais{
     articleTap:ArticleTap[];
     sousTotal:number;
     fraisExp: number
     autreFraisMontant:number;
     autreFraisTitle:string;
     infoSurClient:string
     total:number;
     sommeOfTasks:{task:Task,value:number}[]
}