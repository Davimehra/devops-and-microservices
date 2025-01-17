import React, { useEffect, useRef, useState } from "react";
import VerifyAuthPageCss from '../../css/AuthPages/VerifyAuthPage.module.css'
import CommonCss from '../../css/AuthPages/Common.module.css'
import { useDispatch } from "react-redux";
import VerifyAuthPage_Portait_Css from '../../css/AuthPages/VerifyAuthPage_portait.module.css'



import logo from '../../media/icons/image.png'
import loadingImage from '../../media/icons/loading.webp'
import classNames from "classnames";
import upArrow from '../../media/icons/upArrow.png';
import downArrow from '../../media/icons/downArrow.png';
import fastLoadingImage from '../../media/icons/fastLoadingIcon.png';
import beautifyImage from '../../media/icons/beautifyIcon.png';
import fontsIcon from '../../media/icons/fontsIcon.png';
import imageIcon from '../../media/icons/imageIcon.png';
import languageIcon from '../../media/icons/languageIcon.png';
import themeIcon from '../../media/icons/themeIcon.png';
import thumbnailIcon from '../../media/icons/thumbnailIcon.png';
import fontSizeIcon from '../../media/icons/fontSizeIcon.png';
import passwordShowIcon from '../../media/icons/password_show.png';
import passwordHideIcon from '../../media/icons/password_hide.png';
import restaurantBellAudio from "../../media/sounds/restaurantBell.mp3"
import clickButtonAudio from "../../media/sounds/clickButton.mp3"
import selectSoundAudio from "../../media/sounds/selectSound.mp3"






import { themes, themesStyle } from "../../service/features/themes";
import { languages, languagesTitle } from "../../service/features/languages";
import { loadingTypeDetails, loadingType } from "../../service/features/loading";
import { fontFamily, fontFamilyDetail } from "../../service/features/fontFamily";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyErrors } from "../../service/important/verifyErrors";
import { InvalidVerificationError } from "../../service/errors/verificationErrors/invalidFeildVerification";
import { axiosConfig } from "../../axios/axiosConfig";
import { PasswordVerificationError } from "../../service/errors/verificationErrors/passwordVerificationError";
import { useMediaQuery } from "react-responsive";
import { addToAuth } from "../../redux/slices/authSlice";
import { addToPersonalInfo } from '../../redux/slices/personalInfoSlice'
import AxiosReqWithInteceptor from "../../axios/axiosInterceptors";


const VerifyAuthPage_SignIn_True = () => {
    const [emptyPassword, setEmptyPassword] = useState(true);
    const [isShowingPassword, setIsShowingPassword] = useState(false)
    const [classNamesAll, setClassNamesAll] = useState({ animationShakeClassName: '' })
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isArrowUp, setIsArrowUp] = useState(false);
    const [MediaLoadingOn, setMediaLoadingOn] = useState(true);
    const [fastLoading, setFastLoading] = useState(window?.localStorage?.getItem('loadingType') ?? 'Beautify')
    const [currentTheme, setCurrentTheme] = useState(window?.localStorage?.getItem('themeName') ?? 'Normal')
    const [currentLanguage, setCurrentLanguage] = useState(window?.localStorage?.getItem('languageName') ?? 'English');
    const [currentFontFamily, setCurrentFontFamily] = useState(window?.localStorage?.getItem('fontFamilyName') ?? 'Roboto')
    const [currentFontSizeVariation, setCurrentFontSizeVariation] = useState(window?.localStorage?.getItem('fontSizeVariation') ?? '0vw')
    const [allowSound, setAllowSound] = useState(window?.localStorage?.getItem('allowSound') ?? 'true')



    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const axiosRequestWithInterceptor = AxiosReqWithInteceptor()


    const passwordInputRef = useRef();
    const optionContentRef = useRef();
    const optionButtonRef = useRef();
    const collapesButtonRef = useRef();
    const continueButtonRef = useRef();
    const contentOptionContainerRef = useRef();
    const authContentRef = useRef();
    const footerLineRef = useRef();
    const mainContainerRef = useRef();
    const error_Password_Ref = useRef();
    const mainErrorRef = useRef();
    const mainErrorContainerRef = useRef();

    const dispatch = useDispatch();


    useEffect(() => {

        if (currentTheme) {
            optionButtonRef?.current?.style?.setProperty('--options-optionButton-BackgroundColor', themesStyle[currentTheme]?.options?.optionButton_BackgroundColor)
            collapesButtonRef?.current?.style?.setProperty('--options-collapesButton-BackgroundColor', themesStyle[currentTheme]?.options?.collapesButton_BackgroundColor)
            collapesButtonRef?.current?.style?.setProperty('--options-collapesButton-BackgroundColorHover', themesStyle[currentTheme]?.options?.collapesButton_BackgroundColor_Hover)
            optionContentRef?.current?.style?.setProperty('--options-optionContent-BackgroundColorHover', themesStyle[currentTheme]?.options?.optionContent_BackgroundColor_Hover)
            continueButtonRef?.current?.style?.setProperty('--content-continue-button-backgroundColor', themesStyle[currentTheme]?.content?.continueButton_BackgroundColor)
            continueButtonRef?.current?.style?.setProperty('--content-continue-button-backgroundColorHover', themesStyle[currentTheme]?.content?.continueButton_BackgroundColor_Hover)
            contentOptionContainerRef?.current?.style?.setProperty('--contentAndOption-BackgroundColor', themesStyle[currentTheme]?.contentAndOption?.backgroundColor)
        }
    }, [currentTheme])

    useEffect(() => {
        (() => {
            String(continueButtonRef?.current?.getAttribute('class')).split(' ').forEach((class_value) => {
                // _classname_classname_secret_code
                // const firstPartition = class_value?.slice(0, class_value?.lastIndexOf('_'));
                // const secondPartition = firstPartition?.slice(0, firstPartition?.lastIndexOf('_'))
                const maniputatedArray = class_value?.split("_");
                maniputatedArray.splice(maniputatedArray?.length - 2, 2)
                maniputatedArray.splice(0, 1)
                setClassNamesAll((prev) => {
                    return { ...prev, [maniputatedArray?.join("_")]: class_value }
                })
            })
        })()
    }, [])


    useEffect(() => {
        setEmail(atob(searchParams.get('email')));
        if (!searchParams.get('email')) {
            navigate('/va', { replace: true })
        }
    }, [])

    useEffect(() => {

        if (currentFontFamily) {
            mainContainerRef?.current?.style?.setProperty('--fontFamily', fontFamilyDetail[currentFontFamily])
        }
    }, [currentFontFamily])

    useEffect(() => {
        const PasswordErrorMessage = `<div style="color:red">${languagesTitle?.Password[currentLanguage]}</div> <div> Length 8-16, min one special and capital character</div>`
        error_Password_Ref.current.innerHTML = PasswordErrorMessage;
    }, [currentLanguage])

    useEffect(() => {
        // get all inputs in authContent
        const allInputsOfAuthContent = authContentRef?.current?.querySelectorAll("input");

        if (fastLoading != '') {
            //fastLoading
            if (fastLoading == 'FastLoading') {
                authContentRef?.current?.style?.setProperty('--auth-content-container-boxShadow', loadingTypeDetails?.FastLoading?.authContentContainerBoxShadow)
                footerLineRef?.current?.style?.setProperty('--footer-line-boxShadow', loadingTypeDetails?.FastLoading?.footerLineBoxShadow)
                // No Shadow for all inputs in authContent

                allInputsOfAuthContent?.forEach((input) => {
                    input?.style?.setProperty("--auth-content-input-boxShadow", loadingTypeDetails?.FastLoading?.authContentInputBoxShadow)
                })

                optionButtonRef?.current?.style?.setProperty('--options-optionButton-BoxShadow', loadingTypeDetails?.FastLoading?.optionsOptionButtonBoxShadow)
                collapesButtonRef?.current?.style?.setProperty('--options-optionCollapser-boxShadow', loadingTypeDetails?.FastLoading?.optionsOptionCollapseBoxShadow)

            }

            //Beautify
            if (fastLoading == 'Beautify') {
                authContentRef?.current?.style?.setProperty('--auth-content-container-boxShadow', loadingTypeDetails?.Beautify?.authContentContainerBoxShadow)
                footerLineRef?.current?.style?.setProperty('--footer-line-boxShadow', loadingTypeDetails?.Beautify?.footerLineBoxShadow)

                // Restore shadows for all inputs in authContent
                allInputsOfAuthContent?.forEach((input) => {
                    input?.style?.setProperty("--auth-content-input-boxShadow", loadingTypeDetails?.Beautify?.authContentInputBoxShadow)
                })

                optionButtonRef?.current?.style?.setProperty('--options-optionButton-BoxShadow', loadingTypeDetails?.Beautify?.optionsOptionButtonBoxShadow)
                collapesButtonRef?.current?.style?.setProperty('--options-optionCollapser-boxShadow', loadingTypeDetails?.Beautify?.optionsOptionCollapseBoxShadow)


            }

        }

    }, [fastLoading])



    useEffect(() => {
        mainContainerRef?.current?.style?.setProperty('--fontSizeVariation', currentFontSizeVariation)
    }, [currentFontSizeVariation])




    const onPasswordInput = (input) => {
        if (input?.target?.value === undefined || input?.target?.value === null || String(input?.target?.value).length == 0) {
            setEmptyPassword(true);
            setIsShowingPassword(false)
            passwordInputRef.current.setAttribute("type", 'password')

            // passwordInputRef?.current?.setAttribute("type", "password")
        } else {
            if (String(input?.target?.value).length > 0) {
                setEmptyPassword(false)
            }
        }
    }
    const onClickClear = () => {
        passwordInputRef.current.value = '';
        setEmptyPassword(true);
        setIsShowingPassword(false)
        passwordInputRef.current.setAttribute("type", 'password')
    }
    const onClickShow = () => {
        if (isShowingPassword == false) {
            setIsShowingPassword(true)
        } else {
            setIsShowingPassword(false)
        }

        if (String(passwordInputRef.current.type) === 'password' | String(passwordInputRef.current.type) === null) {
            passwordInputRef.current.setAttribute("type", 'text')
        } else {
            passwordInputRef.current.setAttribute("type", 'password')
        }


    }

    const onClickCollapse = (event) => {
        event.preventDefault();

        const position = optionContentRef.current.style.getPropertyValue('position');
        const frontSideAllOptions = document?.querySelectorAll("div[name='front-side']");
        if (position === '' || position === 'absolute') {
            //Visible
            optionContentRef.current.style.setProperty('position', 'static');
            optionContentRef.current.style.setProperty('visibility', 'visible')
            optionContentRef.current.style.setProperty('display', 'flex')
            optionContentRef.current.style.setProperty('z-index', 0);
            optionButtonRef?.current?.style.setProperty("border", "1px solid rgb(85, 95, 101)")
            frontSideAllOptions?.forEach((value) => {
                value?.style?.setProperty('visibility', 'visible')
            })
            setIsArrowUp(true)
        }
        if (position === 'static') {
            {
                //Hide

                optionContentRef.current.style.setProperty('position', 'absolute');
                optionContentRef.current.style.setProperty('visibility', 'hidden')
                optionContentRef.current.style.setProperty('display', 'none')
                optionContentRef.current.style.setProperty('z-index', -1);
                optionButtonRef?.current?.style.setProperty("border", "none")
                frontSideAllOptions?.forEach((value) => {
                    value?.style?.setProperty('visibility', 'hidden')
                })
                setIsArrowUp(false)
            }
        }

    }

    const onClickFastLoading = () => {
        if (fastLoading == '' || fastLoading == loadingType[0]) {
            setFastLoading(loadingType[1]);
            window?.localStorage?.setItem("loadingType", loadingType[1])

        } else {
            setFastLoading(loadingType[0]);
            window?.localStorage?.setItem("loadingType", loadingType[0])
        }
    }
    const onClickMediaLoading = () => {
        if (MediaLoadingOn) {
            setMediaLoadingOn(false)
        } else {
            setMediaLoadingOn(true)
        }
    }

    const onClickChangeTheme = (event) => {
        const themeName = document?.querySelector("#themeNameId")?.innerText;

        const lengthOfThemeArray = themes?.length;
        const currentIndex = themes?.indexOf(themeName);
        if (currentIndex == -1) {
            document.querySelector("#themeNameId").innerText = themes[0];
            setCurrentTheme(themes[0]);
            window.localStorage?.setItem("themeName", themes[0])
        } else {
            const nextSafe = currentIndex + 1 >= lengthOfThemeArray ? false : true;
            if (nextSafe) {
                document.querySelector("#themeNameId").innerText = themes[currentIndex + 1];
                setCurrentTheme(themes[currentIndex + 1]);
                window.localStorage?.setItem("themeName", themes[currentIndex + 1])
            } else {
                document.querySelector("#themeNameId").innerText = themes[0];
                setCurrentTheme(themes[0]);
                window.localStorage?.setItem("themeName", themes[0])
            }
        }
    }

    const onClickChangeLanguage = (event) => {
        const languageName = document?.querySelector("#languageNameId")?.innerText;

        const lengthOfLanguagesArray = languages?.length;
        const currentIndex = languages?.indexOf(languageName);
        if (currentIndex == -1) {
            document.querySelector("#languageNameId").innerText = languages[0];
            setCurrentLanguage(languages[0]);
            window.localStorage?.setItem("languageName", languages[0])
        } else {
            const nextSafe = currentIndex + 1 >= lengthOfLanguagesArray ? false : true;
            if (nextSafe) {
                document.querySelector("#languageNameId").innerText = languages[currentIndex + 1];
                setCurrentLanguage(languages[currentIndex + 1]);
                window.localStorage?.setItem("languageName", languages[currentIndex + 1])
            } else {
                document.querySelector("#languageNameId").innerText = languages[0];
                setCurrentLanguage(languages[0]);
                window.localStorage?.setItem("languageName", languages[0])
            }
        }
    }

    const onClickChangeFontFamily = (event) => {
        const fontFamilyName = document?.querySelector("#fontFamilyNameId")?.innerText;

        const lengthOfFontFamilyArray = fontFamily?.length;
        const currentIndex = fontFamily?.indexOf(fontFamilyName);
        if (currentIndex == -1) {
            document.querySelector("#fontFamilyNameId").innerText = fontFamily[0];
            setCurrentFontFamily(fontFamily[0]);
            window.localStorage?.setItem("fontFamilyName", fontFamily[0])
        } else {
            const nextSafe = currentIndex + 1 >= lengthOfFontFamilyArray ? false : true;
            if (nextSafe) {
                document.querySelector("#fontFamilyNameId").innerText = fontFamily[currentIndex + 1];
                setCurrentFontFamily(fontFamily[currentIndex + 1]);
                window.localStorage?.setItem("fontFamilyName", fontFamily[currentIndex + 1])
            } else {
                document.querySelector("#fontFamilyNameId").innerText = fontFamily[0];
                setCurrentFontFamily(fontFamily[0]);
                window.localStorage?.setItem("fontFamilyName", fontFamily[0])
            }
        }
    }

    const onClickPlusFontSize = () => {
        const convertedNum = parseFloat(String(currentFontSizeVariation?.replace('vw', '')))
        const validateConversion = !isNaN(convertedNum);
        if (validateConversion) {
            const calculatedFontSizeVariation = convertedNum + 0.055
            setCurrentFontSizeVariation(`${calculatedFontSizeVariation}vw`);
            window?.localStorage?.setItem('fontSizeVariation', `${calculatedFontSizeVariation}vw`)
        } else {
            setCurrentFontSizeVariation('0vw');
        }

    }
    const onClickMinusFontSize = () => {
        const convertedNum = parseFloat(String(currentFontSizeVariation?.replace('vw', '')))
        const validateConversion = !isNaN(convertedNum);
        if (validateConversion) {
            const calculatedFontSizeVariation = convertedNum - 0.055
            setCurrentFontSizeVariation(`${calculatedFontSizeVariation}vw`)
            window?.localStorage?.setItem('fontSizeVariation', `${calculatedFontSizeVariation}vw`)
        } else {
            setCurrentFontSizeVariation('0vw');
        }
    }

    const onClickSwitchEmail = () => {
        navigate(`/va`, { replace: true })
    }

    const onClickForgetPassword = async () => {
        await axiosConfig({
            url: `/auth/user/forgetpassword`,
            params: { getLink: true },
            method: 'post',
            data: { email: email },
            contentType: "application/json",
        }).then((value) => {
            if (value?.data?.message) {
                window?.alert(value?.data?.message)
            } else {
                window?.alert("Password update link send to registered Account")
            }
            navigate('/va', { replace: true })
        })
    }

    const onFocusTab = () => {
        console.log("Focused")
        if (allowSound == 'true') {
            const selectSoundAudioElement = new Audio(selectSoundAudio);
            selectSoundAudioElement.playbackRate = '2'
            selectSoundAudioElement.volume = '1'
            selectSoundAudioElement?.play();
        }
    }

    const onClickSubmit = async () => {


        setIsLoading(true)
        // Reset Error Feild
        mainErrorRef.current.innerText = '';
        mainErrorContainerRef?.current?.style?.setProperty('visibility', 'hidden');
        mainErrorContainerRef?.current?.style?.setProperty('display', 'none');

        // Default Error Border
        passwordInputRef?.current?.style?.setProperty("--input-border-color", "grey")


        let errorCount = 0;
        const allVerifyFeild = [
            verifyErrors({ feildValue: passwordInputRef?.current?.value, feildType: 'password', error_feild_Ref: error_Password_Ref })
        ]

        const verifyResult = await Promise.allSettled(allVerifyFeild);
        verifyResult?.forEach(async (result, index) => {
            if (result?.status == 'rejected') {
                if (result?.reason instanceof PasswordVerificationError) {
                    error_Password_Ref.current.innerHTML = `<div style="color:red">${languagesTitle?.Password[currentLanguage]}</div> <div> Length 8-16, min one special and capital character</div>`;
                    passwordInputRef?.current?.style?.setProperty("--input-border-color", "red");
                    errorCount += 1;
                }
            }
            if (result?.status == 'rejected') {
                if (result?.reason instanceof InvalidVerificationError) {
                    window?.alert(result?.reason?.message)
                    errorCount += 1;
                }
            }

            if (index == verifyResult?.length - 1) {
                // Check Errors Count
                if (errorCount >= 1) {
                    setIsLoading(false)
                    if (allowSound == 'true') {
                        const clickButtonAudioElement = new Audio(clickButtonAudio);
                        clickButtonAudioElement.volume = '0.2'
                        clickButtonAudioElement?.play();
                    }
                    return
                } else {

                    // Success
                    // Do Submit Code Here ***
                    console.log("Successfully Continue");
                    const restaurantBellAudioElement = new Audio(restaurantBellAudio)
                    await axiosConfig({
                        url: `/auth/user/signin`,
                        method: 'post',
                        data: { email: email, password: passwordInputRef?.current?.value },
                        contentType: "application/json",
                    }).then(async (res) => {
                        dispatch(addToAuth({ accessToken: res?.data?.payload?.accessToken, roleIds: res?.data?.payload?.roleIds }))
                        restaurantBellAudioElement.playbackRate = '3'
                        restaurantBellAudioElement.volume = '0.2'
                        restaurantBellAudioElement?.play()
                        navigate(`/homepage`, { replace: true })

                    }).catch((error) => {
                        if (allowSound == 'true') {
                            const clickButtonAudioElement = new Audio(clickButtonAudio);
                            clickButtonAudioElement.volume = '0.2'
                            clickButtonAudioElement?.play();
                        }
                        if (error?.name === 'AxiosError') {
                            mainErrorRef.current.innerText = error?.response?.data?.message;
                            mainErrorContainerRef?.current?.style?.setProperty('visibility', 'visible');
                            mainErrorContainerRef?.current?.style?.setProperty('display', 'flex');
                        } else {
                            console.log(error)
                        }

                    }).finally(() => {
                        setIsLoading(false)
                    })
                }
            }
        })
        setIsLoading(false)
    }




    return (
        useMediaQuery({ orientation: 'landscape' }) ?
            // MainContainer
            <div ref={mainContainerRef} className={VerifyAuthPageCss.MainContainer}>
                {/* R1 - ContentBlock and Option Block */}
                <div ref={contentOptionContainerRef} className={VerifyAuthPageCss.Content_Option_Container}>
                    {/* ContentBlock  - R1C1 - START */}
                    <div className={VerifyAuthPageCss.ContentContainer}>
                        <div className={VerifyAuthPageCss.ContentBlock}>
                            <img src={logo}></img>
                            <div ref={mainErrorContainerRef} className={VerifyAuthPageCss?.MainErrorContainer}>
                                <div>Error</div>
                                <div style={{ color: 'black' }} className={classNames(VerifyAuthPageCss?.textSizeSmall)} ref={mainErrorRef}> </div>
                            </div>
                            <div ref={authContentRef} className={VerifyAuthPageCss.Content}>
                                {/* MainHeading */}
                                <div className={classNames(VerifyAuthPageCss.textSizeLarge, VerifyAuthPageCss.textBold)}>{languagesTitle?.SignIn[currentLanguage]}</div>

                                {/* InputBlock  - Email*/}
                                <div flexdirection='row' className={VerifyAuthPageCss.InputBlock}>
                                    {/* minHeading */}
                                    <div className={VerifyAuthPageCss.InputHeadingBlock}>
                                        <label className={classNames(VerifyAuthPageCss.textSizeSmall)}>{email}</label>
                                    </div>
                                    <div onFocus={onFocusTab} onClick={onClickSwitchEmail} className={classNames(VerifyAuthPageCss.textSizeSmall, VerifyAuthPageCss?.Link, VerifyAuthPageCss?.CursorPointer)}>{languagesTitle?.Switch[currentLanguage]}</div>
                                </div>
                                {/* InputBlock1 - Password */}
                                <div className={VerifyAuthPageCss.InputBlock}>
                                    <div className={VerifyAuthPageCss.InputHeadingBlock}>
                                        <label className={classNames(VerifyAuthPageCss.textSizeMedium, VerifyAuthPageCss.textBold)}>{languagesTitle?.Password[currentLanguage]}</label>
                                        {emptyPassword == false ? <div className={classNames(VerifyAuthPageCss?.CursorPointer, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.Link)} onFocus={onFocusTab} onClick={onClickClear}>{`${languagesTitle?.Clear[currentLanguage]}`}</div> : <div></div>}
                                    </div>
                                    <input onFocus={onFocusTab} tabIndex={1} className={classNames(VerifyAuthPageCss?.InputBlock_Input, VerifyAuthPageCss?.Animation_Shake1deg)} maxLength={16} type="password" ref={passwordInputRef} onInput={onPasswordInput} ></input>
                                    <div flexdirection='row' flexjustify='space-between' >
                                        <div className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)} onFocus={onFocusTab} onClick={onClickForgetPassword}>{'forget password?'}</div>
                                        {emptyPassword == false ?
                                            (isShowingPassword == false ?
                                                <img src={passwordShowIcon} width={'30px'} height={'30px'} tabIndex={2} onFocus={onFocusTab} onClick={onClickShow} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickShow() } }} className={classNames(VerifyAuthPageCss?.CursorPointer, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.Link)}>
                                                </img> :
                                                <img src={passwordHideIcon} width={`${0.055 * 25}vw`} height={`${0.055 * 25}vw`} tabIndex={2} onFocus={onFocusTab} onClick={onClickShow} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickShow() } }} className={classNames(VerifyAuthPageCss?.CursorPointer, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.Link)}>
                                                </img>
                                            )

                                            : <div></div>}

                                    </div>


                                    <div ref={error_Password_Ref} className={classNames(VerifyAuthPageCss.ErrorFeild, VerifyAuthPageCss?.textSizeSmall)}></div>
                                </div>

                                <div tabIndex={3} onFocus={onFocusTab} onClick={onClickSubmit} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickSubmit() } }} ref={continueButtonRef} className={classNames(VerifyAuthPageCss?.ContinueButton, VerifyAuthPageCss?.Animation_Shake1deg)}>
                                    {isLoading ?
                                        <img src={loadingImage} width={'30px'} height={'30px'}></img> :
                                        <div className={classNames(VerifyAuthPageCss.textSizeLarge)}>{languagesTitle?.Continue[currentLanguage]}</div>
                                    }

                                </div>
                                <p className={classNames(VerifyAuthPageCss.textSizeSmall)}>
                                    <label>{`${languagesTitle?.ByContinuingYouAgreeToBhojanalya[currentLanguage]} `}</label>
                                    <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.CursorPointer)}><Link to={'/conditionsofuse'}>{`${languagesTitle?.ConditionsOfUse[currentLanguage]}`}</Link></label>
                                    <label className={VerifyAuthPageCss?.whiteSpaceNormal}> {`${languagesTitle?.And[currentLanguage]} `}</label>
                                    <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.CursorPointer)}><Link to={'/privacynotice'}>{languagesTitle?.PrivacyNotice[currentLanguage]}</Link></label>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* ContentBlock  - R1C1 - END */}

                    {/* OptionBlock - R1C2 - START */}
                    <div className={VerifyAuthPageCss.OptionContainer}>
                        <div className={VerifyAuthPageCss.OptionBlock}>
                            <div flexdirection='row' flexjustify='space-around' ref={optionButtonRef} onFocus={onFocusTab} onClick={onClickCollapse} className={classNames(VerifyAuthPageCss?.OptionButton, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}><label className={VerifyAuthPageCss?.CursorPointer}>{languagesTitle?.Options[currentLanguage]} </label><label><img className={classNames(VerifyAuthPageCss.imgSize20, VerifyAuthPageCss?.CursorPointer)} src={isArrowUp ? upArrow : downArrow} ></img> </label></div>

                            <div id="optionContent" ref={optionContentRef} className={classNames(VerifyAuthPageCss?.OptionContent, VerifyAuthPageCss?.CursorPointer)}>
                                <div onFocus={onFocusTab} onClick={onClickFastLoading} className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>

                                    <div name='titleDiv'>
                                        <div>{fastLoading == 'Beautify' ? `${languagesTitle?.Beautify[currentLanguage]}` : `${languagesTitle?.FastLoading[currentLanguage]}`}</div>
                                    </div>
                                    <div name='imageDiv'>
                                        <img src={fastLoading == 'Beautify' ? beautifyImage : fastLoadingImage}></img>
                                    </div>

                                </div>

                                <div onFocus={onFocusTab} onClick={onClickMediaLoading} className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>
                                    <div name='titleDiv'>
                                        <div>{MediaLoadingOn ? `${languagesTitle?.Thumbnail[currentLanguage]}` : `${languagesTitle?.Image[currentLanguage]}`}</div>
                                    </div>
                                    <div name='imageDiv'>
                                        <img src={MediaLoadingOn ? thumbnailIcon : imageIcon}></img>
                                    </div>
                                </div>
                                <div name='animationParent' onFocus={onFocusTab} onClick={onClickChangeTheme} className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPageCss?.CursorPointer}>{languagesTitle?.Theme[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={themeIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPageCss?.CursorPointer} id='themeNameId'>{currentTheme}</label>
                                    </div>

                                </div>
                                <div name='animationParent' onFocus={onFocusTab} onClick={onClickChangeFontFamily} className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>

                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPageCss?.CursorPointer}>{languagesTitle?.FontFamily[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={fontsIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPageCss?.CursorPointer} id='fontFamilyNameId'>{currentFontFamily}</label>
                                    </div>

                                </div>
                                <div name="animationParent" className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>
                                    {/* <label className={VerifyAuthPageCss?.CursorPointer}>{`${languagesTitle?.Language[currentLanguage]} :`}</label><sub className={VerifyAuthPageCss?.CursorPointer} id="languageNameId">{currentLanguage}</sub> */}
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={classNames(VerifyAuthPageCss?.CursorPointer, VerifyAuthPageCss?.whiteSpaceNormal)}>{languagesTitle?.FontSizeVariation[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={fontSizeIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <button onFocus={onFocusTab} onClick={onClickMinusFontSize}>-</button>
                                        <label className={VerifyAuthPageCss?.CursorPointer} id='currentFontSizeVariationId'>{currentFontSizeVariation}</label>
                                        <button onFocus={onFocusTab} onClick={onClickPlusFontSize}>+</button>
                                    </div>

                                </div>
                                <div name="animationParent" onFocus={onFocusTab} onClick={onClickChangeLanguage} className={classNames(VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.CursorPointer)}>
                                    {/* <label className={VerifyAuthPageCss?.CursorPointer}>{`${languagesTitle?.Language[currentLanguage]} :`}</label><sub className={VerifyAuthPageCss?.CursorPointer} id="languageNameId">{currentLanguage}</sub> */}
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPageCss?.CursorPointer}>{languagesTitle?.Language[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={languageIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPageCss?.CursorPointer} id='languageNameId'>{currentLanguage}</label>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                    {/* OptionBlock - R1C2 - END */}

                </div>

                {/* R2 - Footer Block*/}
                {/* FooterContainer - R2C1*/}
                <div className={VerifyAuthPageCss.FooterContainer}>

                    {/* FooterLine */}
                    <div ref={footerLineRef} className={VerifyAuthPageCss.FooterLine}></div>

                    {/* Footer Content */}
                    <div className={VerifyAuthPageCss.FooterContent}>
                        <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.whiteSpaceNormal, VerifyAuthPageCss?.CursorPointer)}><Link to={'/conditionsofuse'}>{`${languagesTitle?.ConditionsOfUse[currentLanguage]} ,`}</Link> </label>
                        <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.whiteSpaceNormal, VerifyAuthPageCss?.CursorPointer)}><Link to={'/saleconditionpage'}>{`${languagesTitle?.Sale[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.whiteSpaceNormal, VerifyAuthPageCss?.CursorPointer)}><Link to={'/bookingcondition'}>{`${languagesTitle?.Booking[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.whiteSpaceNormal, VerifyAuthPageCss?.CursorPointer)}><Link to={'/privacynotice'}>{`${languagesTitle?.PrivacyNotice[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall, VerifyAuthPageCss?.whiteSpaceNormal, VerifyAuthPageCss?.CursorPointer)}><Link to={'/interestbasedads'}>{`${languagesTitle?.InterestBasedAds[currentLanguage]}`}</Link></label>
                    </div>

                </div>
            </div > :
            // MainContainer Portait
            <div ref={mainContainerRef} className={VerifyAuthPage_Portait_Css.MainContainer}>
                {/* R1 - ContentBlock and Option Block */}
                <div ref={contentOptionContainerRef} className={VerifyAuthPage_Portait_Css.Content_Option_Container}>
                    {/* ContentBlock  - R1C1 - START */}
                    <div className={VerifyAuthPage_Portait_Css.ContentContainer}>
                        <div className={VerifyAuthPage_Portait_Css.ContentBlock}>
                            <img src={logo}></img>
                            <div ref={mainErrorContainerRef} className={classNames(VerifyAuthPage_Portait_Css?.MainErrorContainer, VerifyAuthPage_Portait_Css?.textSizeSmall)}>
                                <div>Error</div>
                                <div style={{ color: 'black' }} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall)} ref={mainErrorRef}> </div>
                            </div>
                            <div ref={authContentRef} className={VerifyAuthPage_Portait_Css.Content}>
                                {/* MainHeading */}
                                <div className={classNames(VerifyAuthPage_Portait_Css.textSizeLarge, VerifyAuthPage_Portait_Css.textBold)}>{languagesTitle?.SignIn[currentLanguage]}</div>

                                {/* InputBlock  - Email*/}
                                <div flexdirection='row' className={VerifyAuthPage_Portait_Css.InputBlock}>
                                    {/* minHeading */}
                                    <div className={VerifyAuthPage_Portait_Css.InputHeadingBlock}>
                                        <label className={classNames(VerifyAuthPage_Portait_Css.textSizeSmall)}>{email}</label>
                                    </div>
                                    <div onFocus={onFocusTab} onClick={onClickSwitchEmail} className={classNames(VerifyAuthPage_Portait_Css.textSizeSmall, VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.CursorPointer)}>{languagesTitle?.Switch[currentLanguage]}</div>
                                </div>
                                {/* InputBlock1 - Password */}
                                <div className={VerifyAuthPage_Portait_Css.InputBlock}>
                                    <div className={VerifyAuthPage_Portait_Css.InputHeadingBlock}>
                                        <label className={classNames(VerifyAuthPage_Portait_Css.textSizeMedium, VerifyAuthPage_Portait_Css.textBold)}>{languagesTitle?.Password[currentLanguage]}</label>
                                        {emptyPassword == false ? <div className={classNames(VerifyAuthPage_Portait_Css?.CursorPointer, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.Link)} onFocus={onFocusTab} onClick={onClickClear}>{`${languagesTitle?.Clear[currentLanguage]}`}</div> : <div></div>}
                                    </div>
                                    <input onFocus={onFocusTab} tabIndex={1} className={classNames(VerifyAuthPage_Portait_Css?.InputBlock_Input, VerifyAuthPage_Portait_Css?.Animation_Shake1deg)} maxLength={16} type="password" ref={passwordInputRef} onInput={onPasswordInput} ></input>
                                    <div flexdirection='row' flexjustify='space-between' >
                                        <div className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)} onFocus={onFocusTab} onClick={onClickForgetPassword}>{'forget password?'}</div>
                                        {emptyPassword == false ?
                                            (isShowingPassword == false ?
                                                <img src={passwordShowIcon} width={'30px'} height={'30px'} tabIndex={2} onFocus={onFocusTab} onClick={onClickShow} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickShow() } }} className={classNames(VerifyAuthPage_Portait_Css?.CursorPointer, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.Link)}>
                                                </img> :
                                                <img src={passwordHideIcon} width={`${0.055 * 25}vw`} height={`${0.055 * 25}vw`} tabIndex={2} onFocus={onFocusTab} onClick={onClickShow} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickShow() } }} className={classNames(VerifyAuthPage_Portait_Css?.CursorPointer, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.Link)}>
                                                </img>
                                            )

                                            : <div></div>}

                                    </div>


                                    <div ref={error_Password_Ref} className={classNames(VerifyAuthPage_Portait_Css.ErrorFeild, VerifyAuthPage_Portait_Css?.textSizeSmall)}></div>
                                </div>

                                <div tabIndex={3} onFocus={onFocusTab} onClick={onClickSubmit} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickSubmit() } }} ref={continueButtonRef} className={classNames(VerifyAuthPage_Portait_Css?.ContinueButton, VerifyAuthPage_Portait_Css?.Animation_Shake1deg)}>
                                    {isLoading ?
                                        <img src={loadingImage} width={'30px'} height={'30px'}></img> :
                                        <div className={classNames(VerifyAuthPage_Portait_Css.textSizeLarge)}>{languagesTitle?.Continue[currentLanguage]}</div>
                                    }

                                </div>
                                <p className={classNames(VerifyAuthPage_Portait_Css.textSizeSmall)}>
                                    <label>{`${languagesTitle?.ByContinuingYouAgreeToBhojanalya[currentLanguage]} `}</label>
                                    <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/conditionsofuse'}>{`${languagesTitle?.ConditionsOfUse[currentLanguage]}`}</Link></label>
                                    <label className={VerifyAuthPage_Portait_Css?.whiteSpaceNormal}> {`${languagesTitle?.And[currentLanguage]} `}</label>
                                    <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/privacynotice'}>{languagesTitle?.PrivacyNotice[currentLanguage]}</Link></label>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* ContentBlock  - R1C1 - END */}

                    {/* OptionBlock - R1C2 - START */}
                    <div className={VerifyAuthPage_Portait_Css.OptionContainer}>
                        <div className={VerifyAuthPage_Portait_Css.OptionBlock}>
                            <div flexdirection='row' flexjustify='space-around' ref={optionButtonRef} onFocus={onFocusTab} onClick={onClickCollapse} className={classNames(VerifyAuthPage_Portait_Css?.OptionButton, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}><label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{languagesTitle?.Options[currentLanguage]} </label><label><img className={classNames(VerifyAuthPage_Portait_Css.imgSize20, VerifyAuthPage_Portait_Css?.CursorPointer)} src={isArrowUp ? upArrow : downArrow} ></img> </label></div>

                            <div id="optionContent" ref={optionContentRef} className={classNames(VerifyAuthPage_Portait_Css?.OptionContent, VerifyAuthPage_Portait_Css?.CursorPointer)}>
                                <div onFocus={onFocusTab} onClick={onClickFastLoading} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>

                                    <div name='titleDiv'>
                                        <div>{fastLoading == 'Beautify' ? `${languagesTitle?.Beautify[currentLanguage]}` : `${languagesTitle?.FastLoading[currentLanguage]}`}</div>
                                    </div>
                                    <div name='imageDiv'>
                                        <img src={fastLoading == 'Beautify' ? beautifyImage : fastLoadingImage}></img>
                                    </div>

                                </div>

                                <div onFocus={onFocusTab} onClick={onClickMediaLoading} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>
                                    <div name='titleDiv'>
                                        <div>{MediaLoadingOn ? `${languagesTitle?.Thumbnail[currentLanguage]}` : `${languagesTitle?.Image[currentLanguage]}`}</div>
                                    </div>
                                    <div name='imageDiv'>
                                        <img src={MediaLoadingOn ? thumbnailIcon : imageIcon}></img>
                                    </div>
                                </div>
                                <div name='animationParent' onFocus={onFocusTab} onClick={onClickChangeTheme} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{languagesTitle?.Theme[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={themeIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPage_Portait_Css?.CursorPointer} id='themeNameId'>{currentTheme}</label>
                                    </div>

                                </div>
                                <div name='animationParent' onFocus={onFocusTab} onClick={onClickChangeFontFamily} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>

                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{languagesTitle?.FontFamily[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={fontsIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPage_Portait_Css?.CursorPointer} id='fontFamilyNameId'>{currentFontFamily}</label>
                                    </div>

                                </div>
                                <div name="animationParent" className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>
                                    {/* <label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{`${languagesTitle?.Language[currentLanguage]} :`}</label><sub className={VerifyAuthPage_Portait_Css?.CursorPointer} id="languageNameId">{currentLanguage}</sub> */}
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={classNames(VerifyAuthPage_Portait_Css?.CursorPointer, VerifyAuthPage_Portait_Css?.whiteSpaceNormal)}>{languagesTitle?.FontSizeVariation[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={fontSizeIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <button onFocus={onFocusTab} onClick={onClickMinusFontSize}>-</button>
                                        <label className={VerifyAuthPage_Portait_Css?.CursorPointer} id='currentFontSizeVariationId'>{currentFontSizeVariation}</label>
                                        <button onFocus={onFocusTab} onClick={onClickPlusFontSize}>+</button>
                                    </div>

                                </div>
                                <div name="animationParent" onFocus={onFocusTab} onClick={onClickChangeLanguage} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.CursorPointer)}>
                                    {/* <label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{`${languagesTitle?.Language[currentLanguage]} :`}</label><sub className={VerifyAuthPage_Portait_Css?.CursorPointer} id="languageNameId">{currentLanguage}</sub> */}
                                    <div name='front-side'>
                                        <div name='titleDiv'>
                                            <label className={VerifyAuthPage_Portait_Css?.CursorPointer}>{languagesTitle?.Language[currentLanguage]}</label>
                                        </div>
                                        <div name='imageDiv'>
                                            <img src={languageIcon}></img>
                                        </div>

                                    </div>
                                    <div name='back-side'>
                                        <label className={VerifyAuthPage_Portait_Css?.CursorPointer} id='languageNameId'>{currentLanguage}</label>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                    {/* OptionBlock - R1C2 - END */}

                </div>

                {/* R2 - Footer Block*/}
                {/* FooterContainer - R2C1*/}
                <div className={VerifyAuthPage_Portait_Css.FooterContainer}>

                    {/* FooterLine */}
                    <div ref={footerLineRef} className={VerifyAuthPage_Portait_Css.FooterLine}></div>

                    {/* Footer Content */}
                    <div className={VerifyAuthPage_Portait_Css.FooterContent}>
                        <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.whiteSpaceNormal, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/conditionsofuse'}>{`${languagesTitle?.ConditionsOfUse[currentLanguage]} ,`}</Link> </label>
                        <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.whiteSpaceNormal, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/saleconditionpage'}>{`${languagesTitle?.Sale[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.whiteSpaceNormal, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/bookingcondition'}>{`${languagesTitle?.Booking[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.whiteSpaceNormal, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/privacynotice'}>{`${languagesTitle?.PrivacyNotice[currentLanguage]} ,`}</Link></label>
                        <label className={classNames(VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall, VerifyAuthPage_Portait_Css?.whiteSpaceNormal, VerifyAuthPage_Portait_Css?.CursorPointer)}><Link to={'/interestbasedads'}>{`${languagesTitle?.InterestBasedAds[currentLanguage]}`}</Link></label>
                    </div>

                </div>
            </div >
    )
}

export default VerifyAuthPage_SignIn_True;