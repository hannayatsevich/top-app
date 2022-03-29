import {SortEnum} from "./Sort.props";
import {IProductModel} from "../../../interfaces/product.interface";

export type SortActions = {type: SortEnum.Rating} | {type: SortEnum.Price};

export interface SortState {
    sort: SortEnum;
    products: IProductModel[];
}

export const sortReducer = (state: SortState, action: SortActions): SortState => {
    switch (action.type) {
        case SortEnum.Rating: 
            return {
                sort: SortEnum.Rating,
                products: [...state.products].sort((a, b) => a.initialRating - b.initialRating),
            };
        case SortEnum.Price: 
            return {
                sort: SortEnum.Price,
                products: [...state.products].sort((a, b) => a.price - b.price),
            };
        default: return state;
    }
};