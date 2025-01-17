import React, { useEffect, useRef, useState } from "react";
import VerifyAuthPageCss from '../../css/AuthPages/VerifyAuthPage.module.css'
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
import clickButtonAudio from "../../media/sounds/clickButton.mp3"
import selectSoundAudio from "../../media/sounds/selectSound.mp3"

import { themes, themesStyle } from "../../service/features/themes";
import { languages, languagesTitle } from "../../service/features/languages";
import { loadingTypeDetails, loadingType } from "../../service/features/loading";
import { fontFamily, fontFamilyDetail } from "../../service/features/fontFamily";
import { Link, useNavigate } from "react-router-dom";
import { verifyErrors } from "../../service/important/verifyErrors";
import { EmailVerificationError } from "../../service/errors/verificationErrors/emailVerificationError";
import { InvalidVerificationError } from "../../service/errors/verificationErrors/invalidFeildVerification";
import { axiosConfig } from "../../axios/axiosConfig";
import { useMediaQuery } from "react-responsive";




const VerifyAuthPage = () => {


    const [emptyEmail, setEmptyEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isArrowUp, setIsArrowUp] = useState(false);
    const [MediaLoadingOn, setMediaLoadingOn] = useState(true);
    const [fastLoading, setFastLoading] = useState(window?.localStorage?.getItem('loadingType') ?? 'Beautify')
    const [currentTheme, setCurrentTheme] = useState(window?.localStorage?.getItem('themeName') ?? 'Normal')
    const [currentLanguage, setCurrentLanguage] = useState(window?.localStorage?.getItem('languageName') ?? 'English');
    const [currentFontFamily, setCurrentFontFamily] = useState(window?.localStorage?.getItem('fontFamilyName') ?? 'Roboto')
    const [currentFontSizeVariation, setCurrentFontSizeVariation] = useState(window?.localStorage?.getItem('fontSizeVariation') ?? '0vw')
    const [allowSound, setAllowSound] = useState(window?.localStorage?.getItem('allowSound') ?? 'true')


    const navigate = new useNavigate();


    const emailInputRef = useRef();
    const optionContentRef = useRef();
    const optionButtonRef = useRef();
    const collapesButtonRef = useRef();
    const continueButtonRef = useRef();
    const contentOptionContainerRef = useRef();
    const authContentRef = useRef();
    const footerLineRef = useRef();
    const mainContainerRef = useRef();
    const error_Email_Ref = useRef();
    const mainErrorRef = useRef();
    const mainErrorContainerRef = useRef();


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

        if (currentFontFamily) {
            mainContainerRef?.current?.style?.setProperty('--fontFamily', fontFamilyDetail[currentFontFamily])
        }
    }, [currentFontFamily])

    useEffect(() => {
        const EmailErrorMessage = `<div style="color:red">${languagesTitle?.Email[currentLanguage]}</div> : ${languagesTitle?.Match[currentLanguage]} email@host.in`
        error_Email_Ref.current.innerHTML = EmailErrorMessage;
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




    const onEmailInput = (input) => {
        if (input?.target?.value === undefined || input?.target?.value === null || String(input?.target?.value).length == 0) {
            setEmptyEmail(true)
        } else {
            if (String(input?.target?.value).length > 0) {
                setEmptyEmail(false)
            }
        }
    }
    const onClickClear = () => {
        emailInputRef.current.value = '';
        setEmptyEmail(true)
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
        if (allowSound == 'true') {
            const clickButtonAudioElement = new Audio(clickButtonAudio);
            clickButtonAudioElement.playbackRate = '2'
            clickButtonAudioElement.volume = '0.1'
            clickButtonAudioElement?.play();
        }

        setIsLoading(true)
        // Reset Error Feild
        mainErrorRef.current.innerText = '';
        mainErrorContainerRef?.current?.style?.setProperty('visibility', 'hidden');
        mainErrorContainerRef?.current?.style?.setProperty('display', 'none');
        let errorCount = 0;
        const allVerifyFeild = [
            verifyErrors({ feildValue: emailInputRef?.current?.value, feildType: 'email', error_feild_Ref: error_Email_Ref })
        ]

        const verifyResult = await Promise.allSettled(allVerifyFeild);
        verifyResult?.forEach(async (result, index) => {
            if (result?.status == 'rejected') {
                if (result?.reason instanceof EmailVerificationError) {
                    error_Email_Ref.current.innerHTML = `<div style="color:red">${languagesTitle?.Email[currentLanguage]}</div> : ${languagesTitle?.Match[currentLanguage]} email@host.in`;
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
                    return
                } else {
                    // Success
                    // Do Submit Code Here ***
                    await axiosConfig({
                        url: `/auth/user/verify`,
                        method: 'post',
                        data: { email: emailInputRef.current.value },
                        contentType: "application/json",
                    }).then((res) => {
                        navigate(`/va/signin?email=${btoa(emailInputRef.current.value)}&sessionsecret=${btoa(Math.round(Math.random() * 10000000))}`, { replace: false })
                    }).catch((error) => {
                        if (error?.response?.data?.statusCode == 404) {
                            navigate(`/va/signuptype?email=${btoa(emailInputRef.current.value)}&sessionsecret=${btoa(Math.round(Math.random() * 10000000))}`, { replace: false })
                        } else {
                            mainErrorRef.current.innerText = error?.response?.data?.message;
                            mainErrorContainerRef?.current?.style?.setProperty('visibility', 'visible');
                            mainErrorContainerRef?.current?.style?.setProperty('display', 'flex');
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
                                <div className={classNames(VerifyAuthPageCss.textSizeLarge, VerifyAuthPageCss.textBold)}>{languagesTitle?.SignInOrCreateAccount[currentLanguage]}</div>

                                {/* InputBlock  - Email*/}
                                <div className={VerifyAuthPageCss.InputBlock}>
                                    <div className={VerifyAuthPageCss.InputHeadingBlock}>
                                        <label htmlFor='email' className={classNames(VerifyAuthPageCss.textSizeMedium)}>{languagesTitle?.EnterEmail[currentLanguage]}</label>
                                        {emptyEmail == false ? <div tabIndex={1} className={classNames(VerifyAuthPageCss?.CursorPointer, VerifyAuthPageCss?.Link, VerifyAuthPageCss?.textSizeSmall)} onFocus={onFocusTab} onClick={onClickClear} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickClear() } }}>{`${languagesTitle?.Clear[currentLanguage]}`}</div> : <div></div>}
                                    </div>
                                    <input onFocus={onFocusTab} tabIndex={2} className={classNames(VerifyAuthPageCss?.InputBlock_Input, VerifyAuthPageCss?.Animation_Shake1deg)} type="email" id="email" ref={emailInputRef} onInput={onEmailInput} ></input>
                                    <div ref={error_Email_Ref} className={classNames(VerifyAuthPageCss.ErrorFeild, VerifyAuthPageCss?.textSizeMedium)}></div>
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
                            {/* 
 */}
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
            </div> :
            //Portait View
            // MainContainer Portait
            <div ref={mainContainerRef} className={VerifyAuthPage_Portait_Css.MainContainer}>
                {/* R1 - ContentBlock and Option Block */}
                <div ref={contentOptionContainerRef} className={VerifyAuthPage_Portait_Css.Content_Option_Container}>
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
                    {/* ContentBlock  - R1C1 - START */}
                    <div className={VerifyAuthPage_Portait_Css.ContentContainer}>
                        <div className={VerifyAuthPage_Portait_Css.ContentBlock}>
                            <img src={logo}></img>
                            <div ref={mainErrorContainerRef} className={classNames(VerifyAuthPage_Portait_Css?.MainErrorContainer, VerifyAuthPage_Portait_Css?.textSizeSmall)}>
                                <div>Error</div>
                                <div style={{ color: 'black' }} className={classNames(VerifyAuthPage_Portait_Css?.textSizeSmall)} ref={mainErrorRef}> </div>
                            </div>
                            <div ref={authContentRef} className={VerifyAuthPage_Portait_Css.Content}>
                                <div className={classNames(VerifyAuthPage_Portait_Css.textSizeLarge, VerifyAuthPage_Portait_Css.textBold)}>{languagesTitle?.SignInOrCreateAccount[currentLanguage]}</div>

                                {/* InputBlock  - Email*/}
                                <div className={VerifyAuthPage_Portait_Css.InputBlock}>
                                    <div className={VerifyAuthPage_Portait_Css.InputHeadingBlock}>
                                        <label htmlFor='email' className={classNames(VerifyAuthPage_Portait_Css.textSizeMedium)}>{languagesTitle?.EnterEmail[currentLanguage]}</label>
                                        {emptyEmail == false ? <div tabIndex={1} className={classNames(VerifyAuthPage_Portait_Css?.CursorPointer, VerifyAuthPage_Portait_Css?.Link, VerifyAuthPage_Portait_Css?.textSizeSmall)} onFocus={onFocusTab} onClick={onClickClear} onKeyDown={(event) => { if (event?.code == 'Space' || event?.code == 'Enter') { onClickClear() } }}>{`${languagesTitle?.Clear[currentLanguage]}`}</div> : <div></div>}
                                    </div>
                                    <input onFocus={onFocusTab} tabIndex={2} className={classNames(VerifyAuthPage_Portait_Css?.InputBlock_Input, VerifyAuthPage_Portait_Css?.Animation_Shake1deg)} type="email" id="email" ref={emailInputRef} onInput={onEmailInput} ></input>
                                    <div ref={error_Email_Ref} className={classNames(VerifyAuthPage_Portait_Css.ErrorFeild, VerifyAuthPage_Portait_Css?.textSizeMedium)}></div>
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
            </div>
    )
}

export default VerifyAuthPage;