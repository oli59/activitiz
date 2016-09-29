--create time_log
create table timelog (tl_id int PRIMARY KEY,
                      tl_date TEXT NOT NULL,
                      tl_startHour TEXT NOT NULL,
                      tl_endHour TEXT NOT NULL,
                      tl_duration REAL not null,
                      tl_act_id int,
                      tl_comment VARCHAR(255),
                      FOREIGN KEY (tl_act_id) REFERENCES activities(act_id)
);

--create activities
create table activities (act_id int PRIMARY KEY,
                          act_parent_id int,
                          act_name varchar(255),
                          act_status VARCHAR(15),
                      FOREIGN KEY(act_parent_id) REFERENCES activities(act_id)
);

--create activities_parent_closure
create table activities_parent_closure (apc_parent_id int, apc_child_id int, apc_depth int);

--trigger activities_parent_closure when inserting in activities
CREATE TRIGGER apc_activities_insert
   AFTER INSERT
   ON activities
   FOR EACH ROW
BEGIN
   INSERT INTO activities_parent_closure values (NEW.act_id, NEW.act_ID, 0);
      insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;

END;

--trigger activities_parent_closure when deleting in activities
CREATE TRIGGER apc_activities_delete
   AFTER DELETE
   ON activities
   FOR EACH ROW
BEGIN
  delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c, activities_parent_closure to_delete
        where p.apc_parent_id = link.apc_parent_id      and c.apc_child_id = link.apc_child_id
        and p.apc_child_id  = to_delete.apc_parent_id and c.apc_parent_id= to_delete.apc_child_id
        and (to_delete.apc_parent_id=OLD.act_id or to_delete.apc_child_id=OLD.act_id)
        and to_delete.apc_depth<2
    );
END;

--trigger activities_parent_closure when updating in activities  null => not null
CREATE TRIGGER apc_activities_update_not_null
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is null and NEW.act_parent_id is not null
BEGIN
      insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;
END;

--trigger activities_parent_closure when updating in activities  not null => null
CREATE TRIGGER apc_activities_update_null
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is not null and NEW.act_parent_id is null
BEGIN
    delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c
      where p.apc_parent_id = link.apc_parent_id and c.apc_child_id = link.apc_child_id
      and p.apc_child_id=OLD.act_parent_id    and c.apc_parent_id=OLD.act_id
    );
END;

--trigger activities_parent_closure when updating in activities  value changed
CREATE TRIGGER apc_activities_update_value_changed
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is not null and NEW.act_parent_id is not null and OLD.act_parent_id <> NEW.act_parent_id
BEGIN
    delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c
      where p.apc_parent_id = link.apc_parent_id and c.apc_child_id = link.apc_child_id
      and p.apc_child_id=OLD.act_parent_id    and c.apc_parent_id=OLD.act_id
    );
    insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;
END;



--copy and recreate activities (useful for structure change)
BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t1_backup(id,parent,name,status);
INSERT INTO t1_backup SELECT act_id, act_parent_id, act_name, act_status FROM activities;
DROP TABLE activities;
delete from activities_parent_closure;
create table activities (act_id int PRIMARY KEY, act_parent_id int, act_name varchar(255), act_status VARCHAR(15),FOREIGN KEY(act_parent_id) REFERENCES activities(act_id));
CREATE TRIGGER apc_activities_insert
   AFTER INSERT
   ON activities
BEGIN
   INSERT INTO activities_parent_closure values (NEW.act_id, NEW.act_ID, 0);
   insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;
END;
CREATE TRIGGER apc_activities_delete
   AFTER DELETE
   ON activities
   FOR EACH ROW
BEGIN
  delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c, activities_parent_closure to_delete
        where p.apc_parent_id = link.apc_parent_id      and c.apc_child_id = link.apc_child_id
        and p.apc_child_id  = to_delete.apc_parent_id and c.apc_parent_id= to_delete.apc_child_id
        and (to_delete.apc_parent_id=OLD.act_id or to_delete.apc_child_id=OLD.act_id)
        and to_delete.apc_depth<2
    );
END;
CREATE TRIGGER apc_activities_update_not_null
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is null and NEW.act_parent_id is not null
BEGIN
      insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;
END;
CREATE TRIGGER apc_activities_update_null
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is not null and NEW.act_parent_id is null
BEGIN
    delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c
      where p.apc_parent_id = link.apc_parent_id and c.apc_child_id = link.apc_child_id
      and p.apc_child_id=OLD.act_parent_id    and c.apc_parent_id=OLD.act_id
    );
END;
CREATE TRIGGER apc_activities_update_value_changed
   AFTER UPDATE OF act_parent_id
   ON activities
   FOR EACH ROW
   WHEN OLD.act_parent_id is not null and NEW.act_parent_id is not null and OLD.act_parent_id <> NEW.act_parent_id
BEGIN
    delete from activities_parent_closure where rowid in (
      select link.rowid from activities_parent_closure p, activities_parent_closure link, activities_parent_closure c
      where p.apc_parent_id = link.apc_parent_id and c.apc_child_id = link.apc_child_id
      and p.apc_child_id=OLD.act_parent_id    and c.apc_parent_id=OLD.act_id
    );
    insert into activities_parent_closure(apc_parent_id, apc_child_id, apc_depth)
      select p.apc_parent_id, c.apc_child_id, p.apc_depth+c.apc_depth+1
      from activities_parent_closure p, activities_parent_closure c
      where p.apc_child_id=NEW.act_parent_id and c.apc_parent_id=NEW.act_id;
END;
INSERT INTO activities SELECT id, parent, name,status FROM t1_backup;
DROP TABLE t1_backup;
COMMIT;

-- TODO delete when works with parent_id
BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t1_backup(id,name,status);
INSERT INTO t1_backup SELECT act_id, act_name, act_status FROM activities;
DROP TABLE activities;
create table activities (act_id int PRIMARY KEY, act_parent_id int, act_name varchar(255), act_status VARCHAR(15),FOREIGN KEY(act_parent_id) REFERENCES activities(act_id));
INSERT INTO activities SELECT id, null, name, status FROM t1_backup;
DROP TABLE t1_backup;
COMMIT;

-- TODO delete when works with parent_id
BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t1_backup(parent, child,depth);
INSERT INTO t1_backup SELECT apc_parent_id, apc_child_id, apc_depth FROM activities_parent_closure;
DROP TABLE activities_parent_closure;
create table activities_parent_closure (apc_parent_id int, apc_child_id int, apc_depth int);
INSERT INTO activities_parent_closure SELECT parent, child, depth FROM t1_backup;
DROP TABLE t1_backup;
COMMIT;