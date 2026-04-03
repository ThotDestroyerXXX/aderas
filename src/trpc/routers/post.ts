import { baseProcedure, createTRPCRouter } from "../init";


export const postRouter = createTRPCRouter({
    getAll: baseProcedure.query(() => {
        return 'Hello world';
    })
})