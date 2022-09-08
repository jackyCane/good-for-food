import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";
// Reusable functions

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (res.ok === false)
      throw new Error(`${data.error}, status: ${res.status}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // propagation the error
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    if (res.ok === false)
      throw new Error(`${data.error}, status: ${res.status}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // propagation the error
  }
};
