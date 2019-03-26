import supportedChains from "./chains";

/**
 * @desc capitalize string
 * @param  {String} [string]
 * @return {String}
 */
export const capitalize = string =>
  string
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

/**
 * @desc ellipse text to max maxLength
 * @param  {String}  [text = '']
 * @param  {Number}  [maxLength = 9999]
 * @return {String}
 */
export const ellipseText = (text = "", maxLength = 9999) => {
  if (text.length <= maxLength) return text;
  const _maxLength = maxLength - 3;
  let ellipse = false;
  let currentLength = 0;
  const result =
    text
      .split(" ")
      .filter(word => {
        currentLength += word.length;
        if (ellipse || currentLength >= _maxLength) {
          ellipse = true;
          return false;
        } else {
          return true;
        }
      })
      .join(" ") + "...";
  return result;
};

/**
 * @desc ellipse public address
 * @param  {String}  [address = '']
 * @return {String}
 */
export const ellipseAddress = (address = "") =>
  `${address.slice(0, 10)}...${address.slice(-10)}`;

/**
 * @desc pad string to specific width and padding
 * @param  {String} n
 * @param  {Number} width
 * @param  {String} z
 * @return {String}
 */
export const padLeft = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * @desc sanitize hexadecimal string
 * @param  {String} address
 * @return {String}
 */
export const sanitizeHex = hex => {
  hex = hex.substring(0, 2) === "0x" ? hex.substring(2) : hex;
  if (hex === "") return "";
  hex = hex.length % 2 !== 0 ? "0" + hex : hex;
  return "0x" + hex;
};

/**
 * @desc remove hex prefix
 * @param  {String} hex
 * @return {String}
 */
export const removeHexPrefix = hex => hex.toLowerCase().replace("0x", "");

/**
 * @desc get ethereum contract call data string
 * @param  {String} func
 * @param  {Array}  arrVals
 * @return {String}
 */
export const getDataString = (func, arrVals) => {
  let val = "";
  for (let i = 0; i < arrVals.length; i++) val += padLeft(arrVals[i], 64);
  const data = func + val;
  return data;
};

/**
 * @desc get chain data
 * @param  {String} func
 * @param  {Array}  arrVals
 * @return {String}
 */
export function getChainData(chainId) {
  const chainData = supportedChains.filter(
    chain => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = process.env.REACT_APP_INFURA_PROJECT_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
}
