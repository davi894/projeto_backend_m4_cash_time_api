import { User } from "../../entities/user"

interface IProjectsRequest{
    name:string,
    description?:string,
    hourValue: number,
    status: string,
    totalValue: number,
<<<<<<< HEAD
    totalTime: string
=======
    totalTime: string,
    
>>>>>>> 3a990c80fd42ff5b0910607f2e4b537565733884

}

interface IProjectsUpdate{
    name?: string,
    description?:string,
    hourValue?:number,
    status?:string
}

export {IProjectsRequest,IProjectsUpdate}