#!/bin/bash
for line in $(cat slugs)
do
	./get-atk-course.sh $line
done
