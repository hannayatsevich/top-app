import {SortEnum} from "./Sort.props";
import {IProductModel} from "../../../interfaces/product.interface";

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
            // eslint-disable-next-line no-case-declarations
            // const products = state.sort === SortEnum.Rating
            //     ? [...action.payload].sort((a, b) => a.initialRating - b.initialRating)
            //     : state.sort === SortEnum.Price
            //         ? [...action.payload].sort((a, b) => a.price - b.price)
            //         : [...action.payload];
            return {
                sort: state.sort,
                products: action.payload,
            };
        default: return state;
    }
};