XML2RFC=xml2rfc

OUT = \
	jsonschema-core.html jsonschema-core.txt \
	jsonschema-validation.html jsonschema-validation.txt \
	jsonschema-hyperschema.html jsonschema-hyperschema.txt
	

all: $(OUT)

%.txt: %.xml
	$(XML2RFC) --text $< -o $@

%.html: %.xml
	$(XML2RFC) --html $< -o $@

clean:
	rm -f $(OUT)

.PHONY: clean
