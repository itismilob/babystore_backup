//TODO: header에 토큰정보 추가해야함

// http://kdt-sw-7-team02.elicecoding.com
export const API_URL = "http://kdt-sw-7-team02.elicecoding.com/api";
export const IMG_URL = API_URL + "/images/";
import * as storage from "./storage";

const checkTokenHead = () => {
  const token = storage.getItem("token");
  if (token) {
    return {
      "Content-Type": "application/json",
      authorization: `${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export const sendPost = async (url, objData = null) => {
  try {
    let headers = {};
    const token = storage.getItem("token");
    if (
      url === "/users/login" ||
      url === "/users/main" ||
      url.includes("/join")
    ) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        authorization: `${token}`,
      };
    }

    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.error(response);
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};

export const sendPostReturnResponse = async (url, objData = null) => {
  try {
    let headers = {};
    const token = storage.getItem("token");
    if (
      url === "/users/login" ||
      url === "/users/main" ||
      url.includes("/join")
    ) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        authorization: `${token}`,
      };
    }

    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(objData),
    });

    return await response;

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.error(response);
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};

const createQueryString = (params) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const sendGetWithQuery = async (url, objData) => {
  try {
    const token = storage.getItem("token");

    const response = await fetch(
      `${API_URL}${url}?${createQueryString(objData)}`,
      {
        method: "GET",
        headers: checkTokenHead(),
      }
    );

    const head = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    };
    console.log(head);

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패" + data);
    }
  } catch (error) {
    console.error(`${url}?${createQueryString(objData)} 오류발생 ${error}`);
  }
};

export const sendGet = async (url, queryData = "") => {
  try {
    let localUrl = `${API_URL}${url}`;

    if (queryData !== "") {
      localUrl += "/" + queryData;
    }

    console.log(localUrl);

    const response = await fetch(localUrl, {
      method: "GET",
      headers: checkTokenHead(),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패" + data);
    }
  } catch (error) {
    console.error(`${url}/${queryData} 오류발생 ${error}`);
  }
};

export const sendGetResponse = async (url, queryData = "") => {
  try {
    let localUrl = `${API_URL}${url}`;

    if (queryData !== "") {
      localUrl += "/" + queryData;
    }

    console.log(localUrl);

    const response = await fetch(localUrl, {
      method: "GET",
      headers: checkTokenHead(),
    });

    return await response;

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패" + data);
    }
  } catch (error) {
    console.error(`${url}/${queryData} 오류발생 ${error}`);
  }
};

export const sendPut = async (url, objData) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${storage.getItem("token")}`,
      },
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};

export const sendDelete = async (url, queryData) => {
  try {
    const response = await fetch(`${API_URL}${url}/${queryData}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${storage.getItem("token")}`,
      },
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};
