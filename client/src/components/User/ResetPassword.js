import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Content from '../../common/molecules/Content';
import Input from '../../common/molecules/Input';
import Button from '../../common/atoms/Button';
import { appContext } from '../../contexts/app';
import { PASSWORD_REGEX } from '../../util/form';

const ResetPassword = () => {
  const { api, setToken, setUser } = useContext(appContext);
  const { token } = useParams();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: 'onBlur',
  });

  const setGlobalError = useCallback(
    message => {
      setFailed(true);
      setError('password', {});
      setError('repeatPassword', {
        type: 'manual',
        message,
      });
    },
    [setError],
  );

  useEffect(() => {
    api.get(`user/can-reset?token=${token}`).then(({ success }) => {
      setInitialLoading(false);
      if (!success) setGlobalError('Token invalid or expired');
    });
  }, [api, setGlobalError, token]);

  const onSubmit = async values => {
    setLoading(true);
    try {
      const { user, token: authToken } = await api.post('user/reset', {
        token,
        ...values,
      });
      setUser(user);
      setToken(authToken);
    } catch {
      setGlobalError('Token expired');
    }
    setLoading(false);
  };

  return (
    <Content title="Reset password" hideHr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          name="password"
          disabled={initialLoading || failed}
          placeholder="Super strong password"
          title="Password"
          error={errors.password}
          ref={register({
            required: 'Required',
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Your password should contain letters and special characters or digits & 8 characters min',
            },
          })}
        />

        <Input
          type="password"
          name="repeatPassword"
          disabled={initialLoading || failed}
          placeholder="Repeat password"
          title="Repeat password"
          error={errors.repeatPassword}
          ref={register({
            validate: value =>
              value === watch('password') || 'Passwords do not match',
          })}
        />

        <Button
          primary
          type="submit"
          disabled={failed}
          isLoading={loading || initialLoading}
        >
          {loading
            ? 'Doing magic...'
            : initialLoading
            ? 'Checking token...'
            : 'Reset'}
        </Button>
      </form>
    </Content>
  );
};

export default ResetPassword;
