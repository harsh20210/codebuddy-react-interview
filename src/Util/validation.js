export const emailValidate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      return false;
    }
    return true;
};


export const passwordMatch = (password) => {
    let reg = /^(?=(?:.*[A-Z].*){2})(?=(?:.*[a-z].*){2})(?=(?:.*\d.*){2})(?=(?:.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-].*){2}).{8,}$/
    if (reg.test(password)) {
      return false;
    }
    return true;
};

export const firstNameMatch = (firstName) => {
  let reg = /^[A-Za-z ]{2,50}$/
  if (reg.test(firstName)) {
    return false;
  }
  return true;
};

export const lastNameMatch = (lastName) => {
  let reg = /^[A-Za-z ]*$/
  if (reg.test(lastName)) {
    return false;
  }
  return true;
};

export const addressMatch = (address) => {
  let reg = /.{10}$/
  if (reg.test(address)) {
    return false;
  }
  return true;
};

export const mobileValidate = (num) => {
    let reg = /^\d{10}$/;
    if (reg.test(num)) {
      return false;
    }
    return true;
  };