#!/bin/bash

# Zip all .tsv files in the current directory using gzip
for file in *.tsv; do
  if [[ -f "$file" ]]; then
    echo "Zipping $file"
    gzip "$file"
  fi
done
