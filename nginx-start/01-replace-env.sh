#!/bin/sh

touch /opt/app-root/src/info.txt

echo "01-replace-env.sh run at: $(date)" > /opt/app-root/src/info.txt
for xenv in \
  REACT_APP_API_DOMAIN \
  REACT_APP_KEYCLOAK_ENDPOINT \
  REACT_APP_KEYCLOAK_SCOPES \
  REACT_APP_KEYCLOAK_REALM \
  REACT_APP_KEYCLOAK_CLIENT_ID \
  REACT_APP_FU_THEME_NAME \
  REACT_APP_SENTRY_ENVIRONMENT \
  REACT_APP_SENTRY_DSN \
  REACT_APP_DOMAIN \
  REACT_APP_GA_CODE \
  REACT_APP_CAPTCHA_STATUS \
  REACT_APP_CAPTCHA_SITE_KEY \
  REACT_APP_CAPTCHA_SECRET_KEY \
  REACT_APP_STORYBOOK_ENABLE ;
do
  if [[ -z "${!xenv}" ]]; then
    echo "$xenv is not defined" >> info.txt
  else
    echo "Replace @@$xenv@@ with value ${!xenv} " >> info.txt
    sed -i "s,@@$xenv@@,${!xenv},g" static/js/main.*.js
    sed -i "s,@@$xenv@@,${!xenv},g" static/js/*.chunk.js
  fi
done
