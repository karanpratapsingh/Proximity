#!/usr/bin/env bash

node node_modules/jetifier/bin/jetify

if [[ "$APPCENTER_BRANCH" =~ ^(master$|release/.*) ]]; then

  if [[ ! -z "$GOOGLE_SERVICES_JSON" ]]; then
    echo "$GOOGLE_SERVICES_JSON" | base64 --decode > android/app/google-services.json
  fi

  if [[ ! -z "$GOOGLE_SERVICES_PLIST" ]]; then
    echo "$GOOGLE_SERVICES_PLIST" | base64 --decode > ios/GoogleService-Info.plist
  fi
fi
