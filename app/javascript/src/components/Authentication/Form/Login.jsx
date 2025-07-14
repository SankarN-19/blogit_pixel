import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Button, Input } from "components/commons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login = ({ handleSubmit, setEmail, setPassword, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Typography className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700">
          {t("auth.sign_in")}
        </Typography>
        <div className="text-center">
          <Link
            className="mt-2 text-sm font-medium text-black transition duration-150 ease-in-out focus:underline focus:outline-none"
            to="/signup"
          >
            {t("auth.or_register_now")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button buttonText="Sign In" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
