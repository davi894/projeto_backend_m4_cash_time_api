interface IProjectsRequest{
    name:string,
    description?:string,
    hour_value: number,
    status: string,
    total_value: number
}

interface IProjectsUpdate{
    name?: string,
    description?:string,
    hour_value?:string,
    status?:string
}

export {IProjectsRequest,IProjectsUpdate}