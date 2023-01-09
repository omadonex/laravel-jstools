import {NotyTypeEnum} from "../NotyTypeEnum";

export interface NotyDataInterface {
    type: NotyTypeEnum,
    text: string,
    delay?: number,
}