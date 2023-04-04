/* SPDX-License-Identifier: MPL-2.0 */

let scriptsPromise;
let cssPromise;

async function registerCss() {
    cssPromise = browser.messageDisplayScripts.register({
        css: [{
            file: "/styles/theme.css"
        }, {
            file: "/styles/custom.css"
        }],
    });

    return cssPromise
}

function registerScripts() {
    const contentScripts = {
        js: [{
            file: "/thirdparty/scripts/highlight.min.js",
        }, {
            file: "/thirdparty/scripts/diff2html-ui.min.js"
        }, {
            file: "/scripts/coloring.js",
        }, {
            file: "/scripts/content.js",
        }],
    };
    scriptsPromise = browser.messageDisplayScripts.register(contentScripts);
}

registerCss().then(registerScripts);
