// import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// // Register the components that the line chart relies on
// Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

// const labels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data1 = {
//   labels: labels1,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };

// const config: ChartConfiguration<'line'> = {
//   type: 'line',
//   data: data1,
// };

// const progressChart = new Chart("progressChart", config);

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
