import { ValidateServiceContract } from '../../ValidateService/contracts/ValidateServiceContract';
import { ValidateErrorListInterface } from '../../ValidateService/interfaces/ValidateErrorListInterface';
import {Form} from "../../../entities/Form/Form";

export interface FormValidateServiceContract extends ValidateServiceContract {
  validateForm(form: Form): ValidateErrorListInterface | true;
}
