import van from "vanjs-core";
import ApexCharts from "apexcharts";
import { showLoginPage } from "./main";
import { graphqlRequest } from "./graphqlServices";
import { ID_QUERY, USER_QUERY, LEVEL_QUERY, TOTAL_XP_AMOUNT, XP_VIEW_QUERY} from "./queries";

const { section, h1, div, button, p, br} = van.tags;

// Helper function to create SVG elements with specified attributes
const createSVGElement = (tag: string, attrs: Record<string, any> = {}) => {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => elem.setAttribute(key, value));
    return elem;
};

// Function to create wave and line SVG elements
const createDecorativeSVGs = () => {
    // Wave 1 - Left side
    const wave1 = createSVGElement("svg", {
        id: "wave1",
        viewBox: "0 0 450 900",
        width: "450",
        height: "900",
        style: "position: absolute; top: 0; left: 0;"
    });
    const wave1Path = createSVGElement("path", {
        d: "M163 0L157.8 18.8C152.7 37.7 142.3 75.3 126.2 112.8C110 150.3 88 187.7 97.5 225.2C107 262.7 148 300.3 159 337.8C170 375.3 151 412.7 127.7 450.2C104.3 487.7 76.7 525.3 69.3 562.8C62 600.3 75 637.7 95.2 675.2C115.3 712.7 142.7 750.3 145 787.8C147.3 825.3 124.7 862.7 113.3 881.3L102 900L0 900L0 881.3C0 862.7 0 825.3 0 787.8C0 750.3 0 712.7 0 675.2C0 637.7 0 600.3 0 562.8C0 525.3 0 487.7 0 450.2C0 412.7 0 375.3 0 337.8C0 300.3 0 262.7 0 225.2C0 187.7 0 150.3 0 112.8C0 75.3 0 37.7 0 18.8L0 0Z",
        fill: "#5bdcd7",
        "stroke-linecap": "round",
        "stroke-linejoin": "miter"
    });
    wave1.appendChild(wave1Path);

    // Wave 3 - Right side
    const wave3 = createSVGElement("svg", {
        id: "wave3",
        viewBox: "0 0 450 900",
        width: "450",
        height: "900",
        style: "position: absolute; top: 0; right: 0;"
    });
    const wave3Path = createSVGElement("path", {
        d: "M408 900L392.8 881.3C377.7 862.7 347.3 825.3 325.2 787.8C303 750.3 289 712.7 291.2 675.2C293.3 637.7 311.7 600.3 324.3 562.8C337 525.3 344 487.7 351.8 450.2C359.7 412.7 368.3 375.3 368.8 337.8C369.3 300.3 361.7 262.7 350.3 225.2C339 187.7 324 150.3 329.5 112.8C335 75.3 361 37.7 374 18.8L387 0L450 0L450 18.8C450 37.7 450 75.3 450 112.8C450 150.3 450 187.7 450 225.2C450 262.7 450 300.3 450 337.8C450 375.3 450 412.7 450 450.2C450 487.7 450 525.3 450 562.8C450 600.3 450 637.7 450 675.2C450 712.7 450 750.3 450 787.8C450 825.3 450 862.7 450 881.3L450 900Z",
        fill: "#5bdcd7",
        "stroke-linecap": "round",
        "stroke-linejoin": "miter"
    });
    wave3.appendChild(wave3Path);

    // Right Line - Right side
    const rightLine = createSVGElement("svg", {
        id: "rightLine",
        viewBox: "0 0 450 900",
        width: "450",
        height: "900",
        style: "position: fixed; top: 0; right: 0;"
    });
    const rightLinePath = createSVGElement("path", {
        d: "M361 900L358.7 881.3C356.3 862.7 351.7 825.3 360.7 787.8C369.7 750.3 392.3 712.7 393.3 675.2C394.3 637.7 373.7 600.3 368.3 562.8C363 525.3 373 487.7 384.8 450.2C396.7 412.7 410.3 375.3 406.2 337.8C402 300.3 380 262.7 376.3 225.2C372.7 187.7 387.3 150.3 381.8 112.8C376.3 75.3 350.7 37.7 337.8 18.8L325 0",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "miter",
        stroke: "#FFFFFF",
        "stroke-width": "5"
    });
    rightLine.appendChild(rightLinePath);

    // Left Line - Left side
    const leftLine = createSVGElement("svg", {
        id: "leftLine",
        viewBox: "0 0 450 900",
        width: "450",
        height: "900",
        style: "position: fixed; top: 0; left: 0;"
    });
    const leftLinePath = createSVGElement("path", {
        d: "M128 0L112.2 18.8C96.3 37.7 64.7 75.3 54 112.8C43.3 150.3 53.7 187.7 64 225.2C74.3 262.7 84.7 300.3 82 337.8C79.3 375.3 63.7 412.7 53.7 450.2C43.7 487.7 39.3 525.3 53.2 562.8C67 600.3 99 637.7 103 675.2C107 712.7 83 750.3 76 787.8C69 825.3 79 862.7 84 881.3L89 900",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "miter",
        stroke: "#FFFFFF",
        "stroke-width": "5"
    });
    leftLine.appendChild(leftLinePath);

    // Append SVGs to document
    document.body.appendChild(wave1);
    document.body.appendChild(wave3);
    document.body.appendChild(rightLine);
    document.body.appendChild(leftLine);
};

interface LevelResponse {
    event_user: { level: number }[];
}

interface XpResponse {
    xp: {
        aggregate: {
            sum: {
                amount: number;
            };
        };
    };
}

export const ShowHomePage = async () => {
    const idResponse = await graphqlRequest<{user: {id: number}[]}>(ID_QUERY);
    const userId = idResponse.data.user[0]?.id;

    if (!userId) {
        console.error("user ID not found");
        return;
    }

    const levelResponse = await graphqlRequest<LevelResponse>(LEVEL_QUERY, { userId });
    const level = levelResponse.data.event_user[0]?.level || "N/A";

    const xpResponse = await graphqlRequest<XpResponse>(TOTAL_XP_AMOUNT, { userId });
    const totalXP = xpResponse.data.xp.aggregate.sum.amount || 0;

    // const xp_response = await graphqlRequest<XpResponse>(XP_VIEW_QUERY);
    // const xp_view = xp_response.data || 0;

    console.log("User ID:", userId);
    console.log("Level:", level);
    console.log("Total XP Amount:", totalXP);

    

    const userData = await graphqlRequest<{ user: { firstName: string; lastName: string }[] }>(USER_QUERY);
    const firstName = userData.data.user[0]?.firstName || "Unknown";
    const lastName = userData.data.user[0]?.lastName || "User";

    console.log(firstName, lastName);

    // graphqlRequest(LEVEL_QUERY);
    // const level = await graphqlRequest<{ user: { firstName: string; lastName: string }[] }>(LEVEL_QUERY);

    const homeContent = 
    section(
        h1(`Welcome ${firstName} ${lastName}!`),
        button(
            {onclick: handleLogout, class: "logout-button"},
            "Logout"
        ),
        div(
            {class: "info"},
            div({class: "info-box"},  p(`Level ${level}`)),
            div({class: "info-box"}, p(`${totalXP} KB`)),
            div({class: "info-box"}, p("current project"))
        ),
        section(
            br(),
            div(
                {id: "line-graph", style: "width: 800px; height: 800px;"}
            ),
        ),
        section(
            br(),
            br(),
            div(
                {id: "radar-graph", style: "width: 1000px; height: 1000px;"}
            ),
        ),
        section(
            h1("Audit Ratio")
        ),
        section(
            h1("Audits Maybe"),
            div("bla bla bla bla bla bla bla")
        ),
    );

    document.body.appendChild(homeContent);

    // Initialize the line chart
    const lineChartOptions = {
         series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            // text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#311B5E82'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    const lineChart = new ApexCharts(document.querySelector("#line-graph"), lineChartOptions);
    lineChart.render();

    // Initialize the radar chart
    const radarChartOptions = {
        series: [{
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20]
        }],
        chart: {
            height: 350,
            type: 'radar',
        },
        title: {
            text: 'Radar Chart - Skill Levels'
        },
        xaxis: {
            categories: ['Coding', 'Testing', 'Design', 'Debugging', 'Documentation', 'Collaboration']
        }
    };

    const radarChart = new ApexCharts(document.querySelector("#radar-graph"), radarChartOptions);
    radarChart.render();

    document.body.appendChild(homeContent);
    createDecorativeSVGs();

    return homeContent;
};

function handleLogout() {
    localStorage.removeItem("jwt");
    showLoginPage();
}

