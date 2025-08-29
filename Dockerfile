FROM fedora

RUN dnf install -y ruby python3-pip
RUN gem install kramdown-rfc
RUN pip install xml2rfc

WORKDIR /app

COPY . .

# First covert md to xml. Then convert xml to html
CMD sh -c "xml2rfc --version \
        && ls ietf/*.md | xargs -n1 sh -c 'kramdown-rfc \"\$0\" > \"\${0%.md}.xml\"' \
        && ls ietf/*.xml | xargs -n1 sh -c 'xml2rfc --html \"\$0\" -p web'"
