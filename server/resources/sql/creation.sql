
--create activities
create table activities (act_id int PRIMARY KEY,
                          act_parent_id int,
                          act_name varchar(255),
                          act_status VARCHAR(15),
                      FOREIGN KEY(act_parent_id) REFERENCES activities(act_id)
);

--create activities_parent_closure
create table activities_parent_closure (apc_parent_id int, apc_child int, apc_depth int);

--trigger activities_parent_closure when inserting in activities
CREATE TRIGGER apc_activities_insert
   AFTER INSERT
   ON activities
BEGIN
   INSERT INTO activities_parent_closure values (NEW.act_id, NEW.act_ID, 0);
   insert into activities_parent_closure(apc_parent_id, apc_child, apc_depth)
      select p.apc_parent_id, c.apc_child, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;

END;



--copy and recreate activities (useful for structure change)
BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t1_backup(id,parent,name,status);
INSERT INTO t1_backup SELECT act_id, act_parent_id, act_name, act_status FROM activities;
DROP TABLE activities;
create table activities (act_id int PRIMARY KEY, act_parent_id int, act_name varchar(255), act_status VARCHAR(15),FOREIGN KEY(act_parent_id) REFERENCES activities(act_id));
CREATE TRIGGER apc_activities_insert
   AFTER INSERT
   ON activities
BEGIN
   INSERT INTO activities_parent_closure values (NEW.act_id, NEW.act_ID, 0);
   insert into activities_parent_closure(apc_parent_id, apc_child, apc_depth)
      select p.apc_parent_id, c.apc_child, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;

END;
INSERT INTO activities SELECT id, parent, name,status FROM t1_backup;
DROP TABLE t1_backup;
COMMIT;
