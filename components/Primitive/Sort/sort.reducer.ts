import {SortEnum} from "./Sort.props";
import {IProductModel} from "@/interfaces/product.interface";

interface ISortRatingAction {
    type: SortEnum.Rating
}
interface ISortPriceAction {
    type: SortEnum.Price
}
interface ISortResetAction {
    type: SortEnum.Reset,
    payload: IProductModel[]
}

export type SortActions = ISortRatingAction | ISortPriceAction | ISortResetAction;

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
        case SortEnum.Reset:
            return {
                sort: SortEnum.Reset,
                products: action.payload,
            };
        default: return state;
    }
};