import { Types } from "mongoose";
import {ITokensPair} from "../services/tokken.service";


export interface IToken extends ITokensPair {
    _userId: Types.ObjectId;
}