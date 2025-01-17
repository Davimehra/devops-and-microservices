import SignPage from "./components/AuthPages/SignPage";

import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import WelcomePage from "./components/AuthPages/WelcomePage";
import HomePage from "./components/Pages/HomePage";
import VerifyAuthPage from "./components/AuthPages/VerifyAuthPage";
// import HeaderImplant from "./components/routerMiddlewares/HeaderImplant";
import PersistentLogin from "./components/AuthPages/Layouts/PersistentLogin";
import AuthorizedLayout from "./components/AuthPages/Layouts/AuthorizedLayout";
import ConditionsOfUsePage from "./components/AuthPages/ConditionsOfUsePage";
import PrivacyNoticePage from "./components/AuthPages/PrivacyNoticePage";
import BookingConditionsPage from "./components/AuthPages/BookingConditionsPage";
import SaleConditionPage from "./components/AuthPages/SaleConditionPage";
import InterestBasedAdsPage from "./components/AuthPages/InterestBasedAdsPage";
import VerifyAuthPage_SignIn from "./components/AuthPages/VerifyAuthPage_SignIn";
import VerifyAuthPage_SignUp_Verify_Email from "./components/AuthPages/VerifyAuthPage_SignUp_Verify_email";
import VerifyAuthPage_SignUp_Type from "./components/AuthPages/VerifyAuthPage_SignUp_Type";
import VerifyAuthPage_SignUp_Restaurant from "./components/AuthPages/VerifyAuthPage_SignUp_Restaurant";
import VerifyAuthPage_SignUp_User from "./components/AuthPages/VerifyAuthPage_SignUp_User";
import VerifyAuthPage_UpdatePassword from "./components/AuthPages/VerifyAuthPage_UpdatePassword";
import ImportantInfoFetchLayout from "./components/AuthPages/Layouts/ImportantInfoFetchLayout";
// import requestAccessToken from "./hooks/refreshTokenApi";
// import { addToAuth } from "./redux/slices/authSlice";
// import { UseDispatch, useDispatch } from "react-redux";


export function App() {
  return (

    <Routes>
      {/* UnAuthorizedPages - Public Pages */}
      <Route path="/signup" element={<SignPage />}></Route>
      <Route path="/signin" element={<SignPage />}></Route>
      <Route path='/va' element={<VerifyAuthPage />}></Route>
      <Route path='/va/forgetpassword' element={<VerifyAuthPage_UpdatePassword />}></Route>
      <Route path='/va/signin' element={<VerifyAuthPage_SignIn />}></Route>

      <Route path='/va/signup/user' element={<VerifyAuthPage_SignUp_User />}></Route>
      <Route path='/va/signup/restaurant' element={<VerifyAuthPage_SignUp_Restaurant />}></Route>


      <Route path='/va/signuptype' element={<VerifyAuthPage_SignUp_Type />}></Route>

      <Route path='/va/signup/verifyem' element={<VerifyAuthPage_SignUp_Verify_Email />}></Route>
      <Route path='/conditionsofuse' element={<ConditionsOfUsePage />}></Route>
      <Route path='/privacynotice' element={<PrivacyNoticePage />}></Route>
      <Route path='/bookingcondition' element={<BookingConditionsPage />}></Route>
      <Route path='/saleconditionpage' element={<SaleConditionPage />}></Route>
      <Route path='/interestbasedads' element={<InterestBasedAdsPage />}></Route>



      <Route path="/" element={<WelcomePage />}></Route>

      <Route element={<PersistentLogin />}>
        <Route element={<AuthorizedLayout />}>
          <Route element={<ImportantInfoFetchLayout />}>
            {/* Passing parameters to JSX for permission  */}
            <Route element={<HomePage />} path="/homepage"></Route>

          </Route>
        </Route>
      </Route>
    </Routes>

  )
}
