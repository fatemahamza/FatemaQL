import van from "vanjs-core";

const { section, h1, div, br } = van.tags;

export const ShowHomePage = () => {
    const homeContent = section(
        h1("Welcome 01 student!"),
        div("Level 25"),
        div("567 KB"),
        div("Current Project"),
        br(),
        br(),
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
        )
    );

    return homeContent;
};
