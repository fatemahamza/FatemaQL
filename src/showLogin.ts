import van from "vanjs-core";

const { section, div, h1, input, button } = van.tags;
declare const KUTE: any;

const createSVGElement = (tag: string, attrs: Record<string, any> = {}) => {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => elem.setAttribute(key, value));
  return elem;
};

// Function to create and return the login form with SVG
export const createLoginContent = () => {
  // Create SVG structure manually
  const blobMotionSVG = createSVGElement("svg", {
    class: "blob-motion",
    id: "visual",
    viewBox: "0 0 960 540",
    width: "960",
    height: "540",
  });

  const g1 = createSVGElement("g", { transform: "translate(511.58983975002076 301.4889074414785)"});
  const path1 = createSVGElement("path", {
    id: "blob1",
    d: "M113.9 -132.2C140.5 -87.2 150.3 -43.6 154 3.8C157.8 51.1 155.6 102.3 129 124.8C102.3 147.3 51.1 141.2 -5.1 146.2C-61.3 151.3 -122.6 167.6 -164.2 145.1C-205.9 122.6 -227.9 61.3 -214.9 13.1C-201.8 -35.1 -153.6 -70.2 -111.9 -115.2C-70.2 -160.2 -35.1 -215.1 4.2 -219.4C43.6 -223.6 87.2 -177.2 113.9 -132.2",
    fill: "#5bdcd7"
  });

  g1.appendChild(path1);

  // Add additional blobs (blob2, blob3, and blob4)
  const g2 = createSVGElement("g", { transform: "translate(459.15365417051987 293.2844567185827)" });
  g2.style.display = "none";
  const path2 = createSVGElement("path", {
    id: "blob2",
    d: "M102.4 -110.1C139.7 -65.1 181.9 -32.5 185.4 3.5C188.9 39.6 153.9 79.2 116.5 110.2C79.2 141.2 39.6 163.6 -1.9 165.5C-43.4 167.4 -86.7 148.7 -112.9 117.7C-139.1 86.7 -148 43.4 -142.3 5.8C-136.5 -31.8 -116 -63.6 -89.8 -108.6C-63.6 -153.6 -31.8 -211.8 0.4 -212.2C32.5 -212.5 65.1 -155.1 102.4 -110.1",
    fill: "#5bdcd7"
  });
  g2.appendChild(path2);

  const g3 = createSVGElement("g", { transform: "translate(448.2616816403163 286.70666456694494)" });
  const path3 = createSVGElement("path", {
    id: "blob3",
    d: "M136 -126.8C181 -91 225.5 -45.5 229 3.5C232.6 52.6 195.1 105.1 150.1 127.6C105.1 150.1 52.6 142.6 -4.5 147C-61.5 151.5 -123 168 -148.9 145.5C-174.7 123 -164.9 61.5 -158.4 6.5C-151.9 -48.6 -148.8 -97.1 -122.9 -132.9C-97.1 -168.8 -48.6 -191.9 -1.5 -190.4C45.5 -188.8 91 -162.6 136 -126.8",
    fill: "none", stroke: "#ffffff", strokeWidth: "3"
  });
  g3.appendChild(path3);

  const g4 = createSVGElement("g", { transform: "translate(457.24366438970026 295.37157667316137)" });
  g4.style.display = "none";

  const path4 = createSVGElement("path", {
    id: "blob4",
    d: "M118.2 -123.2C156.7 -79.7 193.8 -39.8 204.7 10.8C215.5 61.5 200 123 161.5 145.5C123 168 61.5 151.5 -1.1 152.6C-63.6 153.6 -127.3 172.3 -150.8 149.8C-174.3 127.3 -157.6 63.6 -143.4 14.3C-129.1 -35.1 -117.2 -70.2 -93.7 -113.7C-70.2 -157.2 -35.1 -209.1 2.4 -211.5C39.8 -213.8 79.7 -166.7 118.2 -123.2",
    fill: "none", stroke: "#ffffff", strokeWidth: "3"
  });
  g4.appendChild(path4);

  // Append all blobs
  blobMotionSVG.appendChild(g1);
  blobMotionSVG.appendChild(g2);
  blobMotionSVG.appendChild(g3);
  blobMotionSVG.appendChild(g4);

  const loginSection = section(
    { class: "login" },
    div(
      { class: "blob-content" },
      h1("Login"),
      input({ type: "text", name: "username", placeholder: "Username" }),
      input({ type: "password", name: "password", placeholder: "Password" }),
      button({ type: "submit" }, "Login")
    ),
    blobMotionSVG // Append the created SVG
  );

  return loginSection;
};

// Animation Script
export const startAnimation = () => {
  KUTE.fromTo(
    '#blob1',
    { path: '#blob1' },
    { path: '#blob2' },
    { repeat: 999, duration: 4000, yoyo: true }
  ).start();

  KUTE.fromTo(
    '#blob3',
    { path: '#blob3' },
    { path: '#blob4' },
    { repeat: 999, duration: 4000, yoyo: true }
  ).start();
};
