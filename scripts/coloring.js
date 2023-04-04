/* SPDX-License-Identifier: MPL-2.0 */

/* eslint-disable-next-line no-unused-vars */
const coloring = {
    colorizeBody: function() {
        document.body.setAttribute("class", "hljs");
    },

    colorizeDiff: function() {
        /*
         * With plain text, content is under <pre> nodes. We want to insert <code>
         * nodes with .hljs class between these <pre> node and their children.
         */
        const configuration = {
            drawFileList: false,
            fileListToggle: false,
            fileListStartVisible: false,
            fileContentToggle: true,
            outputFormat: 'line-by-line',
            synchronisedScroll: true,
            highlight: true,
            renderNothingWhenEmpty: false,
        }
        const preNodes = document.querySelectorAll("body > div > pre");

        for (const pre of preNodes) {
            for (let i = 0; i < pre.childNodes.length; i++) {
                if (pre.childNodes[i].nodeName === "#text") {
                    var contentList = pre.childNodes[i].textContent.split(/(?=diff --git a)/g);
                    for (const text of contentList) {
                        const div = document.createElement("DIV");
                        div.style.padding = "0";
                        if (text.startsWith("diff --git a")) {
                            document.body.appendChild(div);
                            var diff2htmlUi = new Diff2HtmlUI(div, text, configuration);
                            diff2htmlUi.draw();
                        }
                    }
                    pre.childNodes[i].textContent = contentList[0];
                }
            }
        }
    },
};
