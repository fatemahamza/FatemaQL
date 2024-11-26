import van from "vanjs-core";
import ApexCharts from "apexcharts";
import { showLoginPage } from "./main";
import { graphqlRequest } from "./graphqlServices";
import { ID_QUERY, USER_QUERY, LEVEL_QUERY, TOTAL_XP_AMOUNT, XP_VIEW_QUERY, RADAR_QUERY} from "./queries";

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
        viewBox: "0 0 450 1700",
        width: "450",
        height: "1700",
        style: "position: absolute; top: 0; left: 0;"
    });
    const wave1Path = createSVGElement("path", {
        d: "M85 0L82 21.8C79 43.7 73 87.3 70.3 131C67.7 174.7 68.3 218.3 71.7 261.8C75 305.3 81 348.7 89.8 392.2C98.7 435.7 110.3 479.3 109.5 523C108.7 566.7 95.3 610.3 89 654C82.7 697.7 83.3 741.3 86.5 784.8C89.7 828.3 95.3 871.7 91.2 915.2C87 958.7 73 1002.3 67.5 1046C62 1089.7 65 1133.3 65.3 1177C65.7 1220.7 63.3 1264.3 65.7 1307.8C68 1351.3 75 1394.7 85.5 1438.2C96 1481.7 110 1525.3 115.7 1569C121.3 1612.7 118.7 1656.3 117.3 1678.2L116 1700L0 1700L0 1678.2C0 1656.3 0 1612.7 0 1569C0 1525.3 0 1481.7 0 1438.2C0 1394.7 0 1351.3 0 1307.8C0 1264.3 0 1220.7 0 1177C0 1133.3 0 1089.7 0 1046C0 1002.3 0 958.7 0 915.2C0 871.7 0 828.3 0 784.8C0 741.3 0 697.7 0 654C0 610.3 0 566.7 0 523C0 479.3 0 435.7 0 392.2C0 348.7 0 305.3 0 261.8C0 218.3 0 174.7 0 131C0 87.3 0 43.7 0 21.8L0 0Z",
        fill: "#5bdcd7",
        "stroke-linecap": "round",
        "stroke-linejoin": "miter"
    });
    wave1.appendChild(wave1Path);

    // Wave 3 - Right side
    const wave3 = createSVGElement("svg", {
        id: "wave3",
        viewBox: "0 0 450 1700",
        width: "450",
        height: "1700",
        style: "position: absolute; top: 0; right: 0;"
    });
    const wave3Path = createSVGElement("path", {
        d: "M356 1700L361.5 1678.2C367 1656.3 378 1612.7 383.8 1569C389.7 1525.3 390.3 1481.7 381.3 1438.2C372.3 1394.7 353.7 1351.3 344.7 1307.8C335.7 1264.3 336.3 1220.7 341.8 1177C347.3 1133.3 357.7 1089.7 358 1046C358.3 1002.3 348.7 958.7 344.3 915.2C340 871.7 341 828.3 346.5 784.8C352 741.3 362 697.7 368.7 654C375.3 610.3 378.7 566.7 372 523C365.3 479.3 348.7 435.7 349 392.2C349.3 348.7 366.7 305.3 373.8 261.8C381 218.3 378 174.7 370.8 131C363.7 87.3 352.3 43.7 346.7 21.8L341 0L450 0L450 21.8C450 43.7 450 87.3 450 131C450 174.7 450 218.3 450 261.8C450 305.3 450 348.7 450 392.2C450 435.7 450 479.3 450 523C450 566.7 450 610.3 450 654C450 697.7 450 741.3 450 784.8C450 828.3 450 871.7 450 915.2C450 958.7 450 1002.3 450 1046C450 1089.7 450 1133.3 450 1177C450 1220.7 450 1264.3 450 1307.8C450 1351.3 450 1394.7 450 1438.2C450 1481.7 450 1525.3 450 1569C450 1612.7 450 1656.3 450 1678.2L450 1700Z",
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

interface XpViewResponse {
    xp_view: { 
        amount: number; 
        pathByPath: { 
            results: { createdAt: string }[]; 
        } ;
    }[];
}

interface SkillResponse {
    user: any;
    data: {
      user: {
        transactions: Transaction[];
      }[];
    };
  }

interface Transaction {
    type: string;
    amount: number;
  }

export const ShowHomePage = async () => {
    const idResponse = await graphqlRequest<{user: {id: number}[]}>(ID_QUERY);
    const userId = idResponse.data.user[0]?.id;
    console.log("User ID:", userId);

    if (!userId) {
        console.error("user ID not found");
        return;
    }

    const levelResponse = await graphqlRequest<LevelResponse>(LEVEL_QUERY, { userId });
    const level = levelResponse.data.event_user[0]?.level || "N/A";
    console.log("Level:", level);

    const xpResponse = await graphqlRequest<XpResponse>(TOTAL_XP_AMOUNT, { userId });
    const totalXP = xpResponse.data.xp.aggregate.sum.amount || 0;
    console.log("Total XP Amount:", totalXP);

    const userData = await graphqlRequest<{ user: { firstName: string; lastName: string, auditRatio: number}[] }>(USER_QUERY);
    const firstName = userData.data.user[0]?.firstName || "Unknown";
    const lastName = userData.data.user[0]?.lastName || "User";
    const auditRatio = userData.data.user[0]?.auditRatio;

    console.log(firstName, lastName, auditRatio);

    const xp_viewResponse = await graphqlRequest<XpViewResponse>(XP_VIEW_QUERY);
    const xp_view = xp_viewResponse.data.xp_view;
    console.log("xp_view: ", xp_view);

    // extract data for line chart
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));

    const filteredXpViews = xp_view.filter(entry => {
        const createdAt = entry.pathByPath?.results?.[0]?.createdAt;
        if (createdAt) {
            const entryDate = new Date(createdAt);
            return entryDate >= sixMonthsAgo; // Include if entry is within the last 6 months
        }
        return false;
    });

    const monthlyXpMap: { [key: string]: number } = {};

    filteredXpViews.forEach(entry => {
        const createdAt = entry.pathByPath?.results?.[0]?.createdAt;
        if (createdAt) {
            const entryDate = new Date(createdAt);
            const monthYear = `${entryDate.getMonth()+1}/${entryDate.getFullYear()}`;

            if (monthlyXpMap[monthYear]) {
                monthlyXpMap[monthYear] += entry.amount;
            } else {
                monthlyXpMap[monthYear] = entry.amount;
            }
    
        }
    });

    // Ensure the chart displays the last 6 months, even if some months have no entries
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
        const monthDate = new Date();
        monthDate.setMonth(monthDate.getMonth() - (5 - i));
        return `${monthDate.getMonth() + 1}/${monthDate.getFullYear()}`;
    });

    // Fill missing months with 0 XP
    const monthsFilled = lastSixMonths.map(month => {
        return monthlyXpMap[month] || 0; // Use 0 if no XP data for the month
    });

    const skillsResponse = await graphqlRequest<SkillResponse>(RADAR_QUERY);
    const transactions = skillsResponse.data.user[0]?.transactions || [];
     console.log("transactions: ", transactions);


    const skillTypes = [
        "skill_js", "skill_go", "skill_html", "skill_prog", 
        "skill_front-end", "skill_back-end"
    ];

    // Filter the transactions to only include the relevant skill types
    const filteredSkills = transactions.filter((transaction: Transaction) =>
        skillTypes.includes(transaction.type)
    );
    
    // Map the filtered skills to their respective amounts
    const skillData = skillTypes.map(skillType => {
        const transaction = filteredSkills.find((t: Transaction) => t.type === skillType);
        return transaction ? transaction.amount : 0; // Default to 0 if no data for this skill
    });
    
    console.log("Skill Data: ", skillData);
    
    // Skill categories corresponding to the skills you want to display in the radar chart
    const skillCategories = ['JavaScript', 'Go', 'HTML', 'Programming', 'Front-End', 'Back-End'];

    const homeContent = 
    section(
        h1(`Welcome ${firstName} ${lastName}!`),
        button(
            {onclick: handleLogout, class: "logout-button"},
            "Logout"
        ),
        br(),
        br(),
        div(
            {class: "info"},
            div({class: "info-box"},  p(`Level: ${level}`)),
            div({class: "info-box"}, p(`totalXP: ${totalXP} KB`)),
            div({class: "info-box"}, p(`Audit Ratio: ${auditRatio?.toFixed(2) || "N/A"}`))
        ),
        section(
            br(),
            br(),
            div(
                {id: "line-graph", style: "width: 800px; height: 800px;"}
            ),
        ),
        section(
            br(),
            br(),
            br(),
            br(),
            br(),
            br(),
            br(),
            div(
                {id: "radar-graph", style: "width: 800px; height: 800px;"}
            ),
        ),
    );

    document.body.appendChild(homeContent);

    // Initialize the line chart
    const lineChartOptions = {
        series: [{
            name: "XP Amount",
            data: monthsFilled
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
            text: 'XP Amount Over the Last 6 Months',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#311B5E82'],
                opacity: 0.5
            }
        },
        xaxis: {
            categories: lastSixMonths,
        },
        tooltip: {
            style: {
                fontSize: '14px',
                color: '#000',
            },
            theme: 'dark',
            background: '#f9f9f9',
            borderColor: '#333',
        },
    };

    const lineChart = new ApexCharts(document.querySelector("#line-graph"), lineChartOptions);
    lineChart.render();

    // Initialize the radar chart
    const radarChartOptions = {
        series: [{
            name: "Skills Levels",
            data: skillData,
        }],
        chart: {
            height: 700,
            type: 'radar',
        },
        title: {
            text: 'Radar Chart - Skill Levels',
        },
        xaxis: {
            categories: skillCategories,
            labels: {
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    colors: '#333'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    colors: '#00bfff',
                }
            }
        },
        tooltip: {
            style: {
                fontSize: '14px',
                color: '#000',
            },
            theme: 'dark',
            background: '#f9f9f9',
            borderColor: '#333',
        },
    
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

