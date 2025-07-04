#!/usr/bin/env bash
cd ui
export PYTHONPATH=$(pwd)/..
uvicorn ui.app:app --host 0.0.0.0 --port 10000
