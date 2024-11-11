export interface FilterQuery {
    [key: string]: string | { $regex: string, $options: "im" } | { $ne: string | number | boolean }
        | { $gte: number } | { $lte: number } | { $in: string | number } | { $nin: string | number } | any
}
