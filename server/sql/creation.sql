create table activities (act_id int PRIMARY KEY , act_name varchar(255), act_status VARCHAR(15));

alter table activities add PRIMARY KEY act_id;


BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t1_backup(id,name,status);
INSERT INTO t1_backup SELECT act_id, act_name, act_status FROM activities;
DROP TABLE activities;
create table activities (act_id int PRIMARY KEY , act_name varchar(255), act_status VARCHAR(15));
INSERT INTO activities SELECT id,name,status FROM t1_backup;
DROP TABLE t1_backup;
COMMIT;