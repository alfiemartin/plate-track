"use client";
import { Divider } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full shadow bg-primary-600 text-default-200 text-xs">
      <div className="container mx-auto p-4">
        <p className="font-bold">
          This service, designed to aid witnesses in connecting with victims,
          operates under the following terms and conditions:
        </p>
        <Divider className="mb-2 bg-default-400" />
        <p>
          <span className="font-bold">User Submitted Data:</span> Users may
          voluntarily submit data about a car based on its registration plate to
          assist in connecting with car crash victims. The data collected is
          intended solely for the purpose of facilitating communication between
          witnesses and victims.
        </p>
        <p>
          <span className="font-bold">Privacy and Security:</span> All data
          submitted by users will be treated with the utmost confidentiality and
          will not be shared with any third parties for commercial purposes. The
          website employs rigorous security measures to protect the data and
          ensure its restricted access.
        </p>
        <p>
          <span className="font-bold">Limited Data Accessibility:</span> Data is
          accessible to registered users through a series of specific questions
          related to the incident. Not all details about a car will be available
          to everyone. This approach is intended to safeguard the privacy and
          security of the information.
        </p>
        <p>
          <span className="font-bold">User Responsibility:</span> Users are
          responsible for the accuracy and integrity of the data they submit.
          False or misleading information is strictly prohibited and may result
          in legal actions.
        </p>
        <p>
          <span className="font-bold">No Legal Liability:</span> The website
          operates as a communication platform and does not provide legal advice
          or guarantee the accuracy of the information provided. Users are
          encouraged to verify any information independently before relying on
          it.
        </p>
        <p>
          <span className="font-bold">User Conduct:</span> Users are expected to
          conduct themselves in a respectful and lawful manner while using the
          website. Any misuse, abuse, or violation of terms may result in
          account suspension or legal action.
        </p>
        <p>
          <span className="font-bold">Intellectual Property:</span> The website
          and its content are protected by intellectual property laws and may
          not be reproduced, distributed, or used for commercial purposes
          without explicit permission.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
