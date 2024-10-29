XML2RFC ?= xml2rfc
VENV ?= .venv

OUT = \
	relative-json-pointer.html relative-json-pointer.txt

all: $(VENV) $(OUT)

%.txt: specs/%.xml
	$(XML2RFC) --text $< -o $@

%.pdf: specs/%.xml
	$(XML2RFC) --pdf $< -o $@

%.html: specs/%.xml
	$(XML2RFC) --html $< -o $@

json-schema.tar.gz: $(OUT)
	test ! -e json-schema
	mkdir json-schema
	git clone . json-schema
	(cd json-schema && make)
	tar -czf json-schema.tar.gz --exclude '.*' json-schema
	rm -rf json-schema

$(VENV): requirements.txt
	python -m venv $@
	$@/bin/python -m pip install --upgrade pip
	$@/bin/python -m pip install -r $<

spec-clean:
	rm -f $(OUT) json-schema.tar.gz

clean: spec-clean
	rm -rf $(VENV)

.PHONY: spec-clean clean all
