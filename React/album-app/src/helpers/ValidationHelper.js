export default {
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isSpotifyLink) {
      isValid = value.includes('open.spotify.com') && isValid;
    }
    if (rules.positiveNumber) {
      isValid = Number(value) >= 1 && isValid;
    }

    return isValid;
  }
};
