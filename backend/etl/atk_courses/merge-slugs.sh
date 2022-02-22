#!/bin/bash
for file in ./pages/*.json
do
	cat $file | jq -r '.contentItems[] | .slug' >> slugs
done
