#!/bin/bash
PORT=$1
ADDR=$2
WHO=$3
REL="../data/interviews/compressed/"
FILES=("George-Landrum-Mar-22-1983_Tape3" "Georgia-Harris-Mar-20-1980" "Lula-Samuel-Henrietta-Beck-Aug-11-1982")
PRE="Catawba_"
SUF="_64kbs.mp3"
for f in "${FILES[@]}"; do
	FNAME="$REL$PRE$f$SUF"
	echo "filename is $FNAME"
	echo "port is $PORT"
	echo "user is $WHO"
	echo "ip is $ADDR"
	scp -P $PORT $FNAME $WHO@$ADDR:/var/www/html/nasca-git/NASCA-site/db/data/interviews/compressed/
done