#!/bin/bash

ROOT="$(dirname "$0")/.."
FRONTEND_PATH="${ROOT}/../TiledViewer/frontend"

cat \
    "${FRONTEND_PATH}/utils.js" "${FRONTEND_PATH}/affinetransform.js" \
    "${FRONTEND_PATH}/pinchzoom.js" "${FRONTEND_PATH}/CanvasTilesRenderer.js" \
    "${FRONTEND_PATH}/htmlinterface.js" | jsmin > "${ROOT}/www/js/mapviewer.min.js"
