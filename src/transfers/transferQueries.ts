import { PagedQuery } from "../common/pagedQuery";


export type TransferQuery = PagedQuery & {
    from?: Date,
    to?: Date,
    clubs?: string[]
}