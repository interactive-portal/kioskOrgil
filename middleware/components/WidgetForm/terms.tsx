import React, { useState, useTransition } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

type PropsType = {
  data?: any;
  options?: any;
};

const Terms: FC<PropsType> = ({ data, options }) => {
  return (
    <div className="">
      <body id="terms-and-conditions">
        <div className="container-fluid">
          <div className="row terms-and-conditions-section">
            <div className="col-xs-12 text-center">
              <h1 className="title">Terms and Conditions</h1>
            </div>

            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <div className="content">
                <ul>
                  <li>
                    for any illegal purpose, in any manner inconsistent with
                    applicable laws, regulations, or ordinances, or to submit,
                    post, upload, or otherwise transmit any Customer Data or
                    Content that is unlawful, defamatory, libelous, invasive of
                    another's privacy, abusive, threatening, harassing, vulgar,
                    obscene, indecent or otherwise objectionable;
                  </li>
                  <li>
                    to submit, post, upload or otherwise transmit any Customer
                    Data or Content that infringes or otherwise violates the
                    rights of any third party, including without limitation
                    privacy rights, fiduciary rights and proprietary rights;
                  </li>
                  <li>
                    to submit, post, upload or otherwise transmit Customer Data
                    or Content that contains viruses, corrupted files, or any
                    other similar software or programs that may damage the
                    operation of Project Hub or another person's computer; or
                  </li>
                  <li>
                    if you are a person barred from receiving Project Hub under
                    the laws of the United States or other countries, including
                    the country in which you are resident or from which you use
                    Project Hub.
                  </li>
                </ul>

                <h2 className="section-title">
                  2. Cancellation and Termination
                </h2>
                <p>
                  To cancel your subscription, account, and access to Project
                  Hub, send us an email at{" "}
                  <a href="mailto:hi@tryprojecthub.com?Subject=Cancel+Subscription">
                    hi@tryprojecthub.com
                  </a>{" "}
                  instructing us to do so or cancel via the functionality on the
                  Waffle website.
                </p>
                <p>
                  You agree that Xmartlabs, in its sole discretion and for any
                  or no reason, may terminate or suspend your account.
                </p>

                <h2 className="section-title">3. Customer Data</h2>
                <p>
                  u and Xmartlabs, Xmartlabs shall own all compilations of the
                  Aggregated Data, including all reports, statistics or analyses
                  created or derived therefrom.
                </p>
                <p>
                  You understand that projects in Project Hub will display
                  Customer Data to you and any collaborators that you designate
                  for that project.
                </p>

                <h2 className="section-title">4. Ideas and Feedback</h2>
                <p>
                  As part of your use of Project Hub, you may choose, or we may
                  invite you, to submit comments, feedback or ideas about Ideas
                  as proprietary or confidential.
                </p>

                <p>Version 1.0, June 7, 2017</p>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row footer-logo-container">
              <div className="col col-xs-12 text-center">test</div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Terms;
