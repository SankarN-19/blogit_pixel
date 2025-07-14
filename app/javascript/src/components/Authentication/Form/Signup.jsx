import React, { useState, useEffect } from "react";

import { Select, Typography } from "@bigbinary/neetoui";
import { Button, Input } from "components/commons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import organizationsApi from "../../../apis/organizations";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
  setOrganization,
}) => {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.fetch();
      setOrganizations(organizations);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const organizationOptions = organizations.map(org => ({
    value: org.id,
    label: org.name,
  }));

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
      px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <Typography
          className="mt-6 text-center text-3xl font-extrabold
          leading-9 text-gray-700"
        >
          {t("auth.sign_up")}
        </Typography>
        <div className="text-center">
          <Link
            to="/"
            className="mt-2 text-center text-sm font-medium transition duration-150 ease-in-out
              focus:underline focus:outline-none"
          >
            {t("auth.or_login_now")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium leading-none text-gray-800">
              {t("posts.organization_label")}
            </label>
            <div className="mt-1 w-full">
              <Select
                isSearchable
                menuPosition="fixed"
                options={organizationOptions}
                placeholder="Select Organization"
                onChange={e => setOrganization(e.value)}
              />
            </div>
          </div>
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button buttonText="Register" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
