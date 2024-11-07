import { createLoginContent, startAnimation } from './showLogin';
import van from "vanjs-core";

const showLogin = () => {
  // Create login content and append it to the body
  const loginContent = createLoginContent();

  // clear here
  van.add(document.body, loginContent);

  // Start the animation once the content is rendered
  document.addEventListener("DOMContentLoaded", startAnimation);
};

// Call the function to display login content when needed
showLogin();
