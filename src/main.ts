import { createLoginContent, startAnimation } from './showLogin';
import { ShowHomePage } from './showHomePage';
import van from "vanjs-core";

const clearBody = () => {
  document.body.innerHTML = "";
};

const showLoginPage = () => {
  clearBody();
  const loginContent = createLoginContent();
  van.add(document.body, loginContent);
  document.addEventListener("DOMContentLoaded", startAnimation);
};

const showHome = async () => {
  clearBody();
  const homeContent = ShowHomePage();
  van.add(document.body, await homeContent);
};

const isAuthenticated = () => {
  const token = localStorage.getItem("jwt");
  return !!token;
}

if (isAuthenticated()) {
  showHome();
} else {
  showLoginPage();
}

export {showLoginPage, showHome};