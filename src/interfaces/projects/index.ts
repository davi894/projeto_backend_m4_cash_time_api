interface IProjectsRequest{
    name:string,
    description?:string,
    hourValue: number,
    status: string,
    totalValue: number
}

interface IProjectsUpdate{
    name?: string,
    description?:string,
    hourValue?:string,
    status?:string
}

export {IProjectsRequest,IProjectsUpdate}