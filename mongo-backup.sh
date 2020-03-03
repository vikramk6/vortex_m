#!/bin/sh
 
TODAY=`date +%d%b%Y`
VER_BACKUP_DIR=./mongobackups/db
BACKUP_DIR=./mongobackups/all/
mkdir -p ${VER_BACKUP_DIR}/${TODAY}
mkdir -p ${BACKUP_DIR}/${TODAY}
mongodump --db ver --out ${VER_BACKUP_DIR}/${TODAY}/
mongodump --out ${BACKUP_DIR}/${TODAY}/
