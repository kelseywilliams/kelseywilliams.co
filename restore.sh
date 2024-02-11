#!/bin/bash/
# restore db from docker backup_vol volume. Stores last resort backup out of cwd
cp /var/lib/docker/kelseywilliamsco_backup_vol/_data/backup.sql web/database/migrations/backup.sql