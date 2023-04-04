# SPDX-License-Identifier: MPL-2.0

ADDON=colorediffs.xpi

HLJS_VERSION=11.7.0
HLJS_SCRIPT=thirdparty/scripts/highlight.min.js
DIFF_SCRIPT=thirdparty/scripts/diff2html-ui.min.js

xpi: $(ADDON)

%.xpi: \
	manifest.json \
	README.md \
	scripts/ \
	styles/ \
	$(HLJS_SCRIPT) \
	$(DIFF_SCRIPT)
	zip -q -r $@ $^

$(HLJS_SCRIPT):
	wget cdnjs.cloudflare.com/ajax/libs/highlight.js/$(HLJS_VERSION)/highlight.min.js
	mkdir -p thirdparty/scripts
	mv highlight.min.js thirdparty/scripts

$(DIFF_SCRIPT):
	wget https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html-ui.min.js
	mkdir -p thirdparty/scripts
	mv diff2html-ui.min.js thirdparty/scripts
