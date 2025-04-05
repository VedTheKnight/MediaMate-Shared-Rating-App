#!/bin/bash

# Unzip all .gz files in the current directory using gunzip
for file in *.gz; do
  if [[ -f "$file" ]]; then
    echo "Unzipping $file"
    gunzip "$file"
  fi
done
