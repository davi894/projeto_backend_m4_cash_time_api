import * as yup from "yup"


export const projectSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    hourValue: yup.number().required(),
    status:yup.string().required(),
    totalValue : yup.number().required(),
    totalTime : yup.string().required()
})

export const updateProjectsSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    hourValue: yup.number(),
    status:yup.string()
})