XML2RFC=xml2rfc

OUT = \
	jsonschema-core.html jsonschema-core.txt \
	jsonschema-validation.html jsonschema-validation.txt \
	jsonschema-hyperschema.html jsonschema-hyperschema.txt \
	relative-json-pointer.html relative-json-pointer.txt
	

all: $(OUT)

%.txt: %.xml
	$(XML2RFC) --text $< -o $@

%.html: %.xml
	$(XML2RFC) --html $< -o $@

json-schema.tar.gz: $(OUT)
	mkdir json-schema
	git clone . json-schema
	(cd json-schema && make)
	tar -czf json-schema.tar.gz --exclude '.*' json-schema
	rm -rf json-schema

clean:
	rm -f $(OUT) json-schema.tar.gz

.PHONY: clean
