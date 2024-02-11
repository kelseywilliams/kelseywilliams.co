#!/bin/bash/
# restore db from docker backup_vol volume. Stores last resort backup out of cwd
cp /var/lib/docker/kelseywilliamsco_backup_vol/backup.sql web/database/migrations/backup.sql
cp /var/lib/docker/kelseywilliamsco_backup_vol/backup.sql /var/lib/kelseywilliamsco_backup_vol.sql