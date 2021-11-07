

export interface Money {
    /**
     * The currency symbol like: €
     */
    currency: string,
    /**
     * the amount in the given currency
     */
    amount: number,
    /**
     * any comment to why the amount might be set or that the currency is not available
     */
    comment: string
}

export const MoneySchemaFields: Record<keyof Money, any> = {
    currency: String,
    amount: Number,
    comment: String
}