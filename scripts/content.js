/* SPDX-License-Identifier: MPL-2.0 */

/* Check that this is a plain text email. We don't do HTML. */
function isPlainText() {
    const bodyNodes = document.body.childNodes;

    for (const node of bodyNodes) {
        if (node.className === "moz-text-plain") {
            return true;
        }
    }

    return false;
}

/* Check whether this message contains diff snippets */
function hasDiff() {
    /* These patterns were kept from the old version of the add-on */
    const contextLineTag = /^(?:\*|-){3}\s+(\d+),\d+\s+(?:\*|-){4}$/m;
    const unifiedLineTag = /^@@\s+-\d+(?:,\d+)?\s\+\d+(?:,\d+)?\s+@@/m;
    const unifiedNewTag = /^--- NEW FILE:\s.* ---$/m;
    const unifiedBinaryTag = /^---\s(?:new\s)?BINARY FILE:\s.*\s---$/m;
    const textBody = document.body.textContent;

    for (const tag of [contextLineTag, unifiedLineTag, unifiedNewTag, unifiedBinaryTag]) {
        if (tag.test(textBody)) {
            return true;
        }
    }

    return false;
}

/* Trigger checks, toolbar, and coloring */
(function() {
    if (!isPlainText() || !hasDiff()) {
        return;
    }

    coloring.colorizeBody();
    coloring.colorizeDiff();
})();
