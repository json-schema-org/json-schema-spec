XML2RFC ?= xml2rfc
VENV ?= .venv

OUT = \
	jsonschema-core.html jsonschema-core.txt \
	jsonschema-validation.html jsonschema-validation.txt \
	relative-json-pointer.html relative-json-pointer.txt

all: $(OUT)

%.txt: %.xml
	$(XML2RFC) --text $< -o $@

%.pdf: %.xml
	$(XML2RFC) --pdf $< -o $@

%.html: %.xml
	$(XML2RFC) --html $< -o $@

json-schema.tar.gz: $(OUT)
	test ! -e json-schema
	mkdir json-schema
	git clone . json-schema
	(cd json-schema && make)
	tar -czf json-schema.tar.gz --exclude '.*' json-schema
	rm -rf json-schema

venv: $(VENV)

$(VENV):
	python -m venv .venv
	. .venv/bin/activate && python -m pip install --upgrade pip setuptools wheel
	. .venv/bin/activate && python -m pip install -r requirements.txt

venv-clean:
	rm -rf .venv

clean:
	rm -f $(OUT) json-schema.tar.gz

.PHONY: clean all
