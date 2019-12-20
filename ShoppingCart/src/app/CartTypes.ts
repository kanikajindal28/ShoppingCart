import {UserTypes} from "src/app/UserTypes";
import {ProductTypes} from "src/app/ProductTypes";

export interface CartTypes {
  id : number;
  quantity : number;
  productId : ProductTypes;
  userId : UserTypes;
}
