// Password validation function
export const validatePassword = (password) => {
  // Check for length
  if (password.length < 8) {
    return 'Password should be at least 8 characters long';
  }

  // Check for upper case letter
  if (!/[A-Z]/.test(password)) {
    return 'Password should contain at least one upper case letter';
  }

  // Check for lower case letter
  if (!/[a-z]/.test(password)) {
    return 'Password should contain at least one lower case letter';
  }

  // Check for numeral
  if (!/[0-9]/.test(password)) {
    return 'Password should contain at least one numeral (0-9)';
  }

  // Check for special character
  if (!/[!@#$&*]/.test(password)) {
    return 'Password should contain at least one special character (!@#$&*)';
  }
};
