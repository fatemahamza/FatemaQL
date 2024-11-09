import van from "vanjs-core";
import { showLoginPage } from "./main";
import { fetchUserData } from "./getUserData";

const { section, h1, div, button, p} = van.tags;

export const ShowHomePage = () => {
    const homeContent = 
    section(
        h1("Welcome 01 student!"),
        div(
            {class: "info"},
            p("Level 25"),
            p("456 KB"),
            p("current project")
        ),
        section(
            h1("Chart for Progress")
        ),
        section(
            h1("Chart for Skills")
        ),
        section(
            h1("Audit Ratio")
        ),
        section(
            h1("Audits Maybe"),
            div("bla bla bla bla bla bla bla")
        ),
        button(
            {onclick: handleLogout},
            "Logout"
        ),
    );

    fetchUserData();

    return homeContent;
};

function handleLogout() {
    localStorage.removeItem("jwt");
    showLoginPage();
}