XML2RFC=xml2rfc

OUT = \
	jsonschema-core.html jsonschema-core.txt \
	jsonschema-validation.html jsonschema-validation.txt \
	relative-json-pointer.html relative-json-pointer.txt


all: $(OUT)

%.txt: %.xml
	$(XML2RFC) --text $< -o $@

%.html: %.xml
	$(XML2RFC) --html $< -o $@

json-schema.tar.gz: $(OUT)
	git clone . json-schema
	make -C json-schema
	tar -czf json-schema.tar.gz --exclude '.*' json-schema
	rm -rf json-schema

clean:
	rm -f $(OUT) json-schema.tar.gz

.PHONY: clean
