const crypto = require("crypto");

function hashString({ password, salt }) {
  const hash = crypto.createHmac(`sha512`, salt);
  hash.update(password);
  const hashStr = hash.digest("hex");

  return {
    hashStr,
  };
}

module.exports = {
  hashString,
};
