import { BranchNameVerificationError } from "../errors/verificationErrors/branchNameVerificationError";
import { EmailVerificationError } from "../errors/verificationErrors/emailVerificationError";
import { InvalidVerificationError } from "../errors/verificationErrors/invalidFeildVerification";
import { NameVerificationError } from "../errors/verificationErrors/nameVerificationError copy";
import { OTPVerificationError } from "../errors/verificationErrors/otpVerificationError";
import { PasswordVerificationError } from "../errors/verificationErrors/passwordVerificationError";
import { RestaurantIdVerificationError } from "../errors/verificationErrors/restaurantIdVerificationError";
import { RestaurantNameVerificationError } from "../errors/verificationErrors/restaurantNameVerificationError";



export const verifyErrors = ({ feildValue, feildType, error_feild_Ref }) => {

    return new Promise((resolve, reject) => {
        switch (feildType) {
            case 'email':
                if (String(feildValue)?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';

                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')
                    // error_feild_Ref.current.innerHTML = ErrorMessage;

                    reject(new EmailVerificationError());
                    break;
                }
            case 'password':
                if (String(feildValue)?.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';

                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')
                    // error_feild_Ref.current.innerHTML = ErrorMessage;

                    reject(new PasswordVerificationError());
                    break;
                }
            case 'name':
                if (String(feildValue)?.match(/^[a-zA-Z ].{4,30}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';

                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')

                    reject(new NameVerificationError());
                    break;
                }
            case 'restaurantId':
                if (String(feildValue)?.match(/^[0-9]{1,10}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';

                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')

                    reject(new RestaurantIdVerificationError());
                    break;
                }
            case 'restaurantName':
                if (String(feildValue)?.match(/^[a-zA-Z ].{4,30}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';

                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')

                    reject(new RestaurantNameVerificationError());
                    break;
                }
            case 'branchName':

                if (String(feildValue)?.match(/^[a-zA-Z ].{4,30}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';
                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')
                    reject(new BranchNameVerificationError());
                    break;
                }
            case 'otp':

                if (String(feildValue)?.match(/^[a-zA-Z0-9 ]{5,8}$/) && feildValue != undefined) {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'hidden');
                    error_feild_Ref?.current?.style?.setProperty('display', 'none');
                    // error_feild_Ref.current.value = '';
                    resolve(true);
                    break;
                } else {
                    error_feild_Ref?.current?.style?.setProperty('visibility', 'visible')
                    error_feild_Ref?.current?.style?.setProperty('display', 'flex')
                    reject(new OTPVerificationError());
                    break;
                }
            default: reject(new InvalidVerificationError()); break;
        }
    })

}