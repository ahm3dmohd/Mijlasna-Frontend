// Password + confirm password inputs, shared by sign up, edit profile and edit user.
// Shows "Passwords do not match." under the confirm field while they differ.
function PasswordFields({
  password,
  passwordConf,
  onChange,
  required = false,
  passwordLabel = 'Password:',
  confirmLabel = 'Confirm Password:',
}) {
  const mismatch = passwordConf !== '' && password !== passwordConf

  return (
    <>
      <div>
        <label htmlFor='password'>{passwordLabel}</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={onChange}
          autoComplete='new-password'
          minLength={6}
          required={required}
        />
      </div>
      <div>
        <label htmlFor='passwordConf'>{confirmLabel}</label>
        <input
          type='password'
          id='passwordConf'
          name='passwordConf'
          value={passwordConf}
          onChange={onChange}
          autoComplete='new-password'
          // when a new password is typed, it has to be confirmed
          required={required || password !== ''}
        />
        {mismatch && <p className='error' role='alert'>Passwords do not match.</p>}
      </div>
    </>
  )
}

export default PasswordFields
