FROM fedora

RUN dnf install -y ruby python3-pip
# Fedora's CA bundle exists, but Ruby OpenSSL defaults to /etc/pki/tls/cert.pem.
# kramdown-rfc aborts early if that default path is missing.
RUN ln -sf /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem /etc/pki/tls/cert.pem
RUN gem install kramdown-rfc
RUN pip install xml2rfc

WORKDIR /app

COPY . .

# First convert md to xml. Then convert xml to html
CMD sh -c "xml2rfc --version \
        && ls ietf/*.md | xargs -n1 sh -c 'kramdown-rfc \"\$0\" > \"\${0%.md}.xml\"' \
        && ls ietf/*.xml | xargs -n1 sh -c 'xml2rfc --html \"\$0\" -p web'"
