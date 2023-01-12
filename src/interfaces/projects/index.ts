interface IProjectsRequest{
    name:string,
    description?:string,
    hourValue: number,
    status: string,
    totalValue: number,
    totalTime: number
}

interface IProjectsUpdate{
    name?: string,
    description?:string,
    hourValue?:number,
    status?:string
}

export {IProjectsRequest,IProjectsUpdate}