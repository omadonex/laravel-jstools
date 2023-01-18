import { ContextTypeEnum } from '../../../types/ContextTypeEnum';

export interface NotyDataInterface {
  context: ContextTypeEnum;
  message: string;
  delay?: number;
}
