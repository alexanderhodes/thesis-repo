-- clear everything
delete from public.user_roles_role where 1 = 1;
delete from public.user where 1 = 1;
delete from public.role_permissions_permission where 1 = 1;
delete from public.permission where 1 = 1;
delete from public.role where 1 = 1;

-- insert roles
insert into public.role (name) values ('BOARD');
insert into public.role (name) values ('INTERN');
insert into public.role (name) values ('ADMINISTRATOR');
insert into public.role (name) values ('EXTERN');

-- insert permissions
insert into public.permission (name) values ('ASSETS_CREATE');
insert into public.permission (name) values ('ASSETS_READ');
insert into public.permission (name) values ('ASSETS_UPDATE');
insert into public.permission (name) values ('ASSETS_DELETE');
insert into public.permission (name) values ('ASSETS_SUGGEST');
insert into public.permission (name) values ('ASSETS_CONNECT');
insert into public.permission (name) values ('USER_CREATE');
insert into public.permission (name) values ('USER_READ');
insert into public.permission (name) values ('USER_UPDATE');
insert into public.permission (name) values ('USER_DELETE');
insert into public.permission (name) values ('CONFIGURATION_CREATE');
insert into public.permission (name) values ('CONFIGURATION_READ');
insert into public.permission (name) values ('CONFIGURATION_UPDATE');
insert into public.permission (name) values ('CONFIGURATION_DELETE');

-- insert role and permissions
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_CREATE');
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_READ');
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_UPDATE');
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_DELETE');
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_SUGGEST');
insert into public.role_permissions_permission ("roleName", "permissionName") values ('BOARD', 'ASSETS_CONNECT');

insert into public.role_permissions_permission ("roleName", "permissionName") values ('INTERN', 'ASSETS_READ');

insert into public.role_permissions_permission ("roleName", "permissionName") values ('EXTERN', 'ASSETS_READ');

insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','USER_CREATE') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','USER_READ') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','USER_UPDATE') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','USER_DELETE') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','CONFIGURATION_CREATE') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','CONFIGURATION_READ') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','CONFIGURATION_UPDATE') ;
insert into public.role_permissions_permission ("roleName", "permissionName") values ('ADMINISTRATOR','CONFIGURATION_DELETE') ;

-- insert default user
INSERT INTO public."user" (id, username, password, "publicKey", "privateKey") VALUES ('8a5ecfc8-7d3a-40cb-95e4-5cfb59e3f889', 'alex', '$2b$10$RsMvon91WvCUcOH40q2l4.DAJHzChShQWRnSk2/nQ3.7tGBenph6W', '5bL8RdeB5idG4yD79jxBSVZ62HtjiTxrnAmhDviYCHh3', '$2b$10$p.otiozW89lWhQWw6jM1AeXdGVyCObqzjBu4TOjBwNotwMyJoCL7i');
insert into public.user_roles_role ("userId", "roleName") values ((select "id" from public.user where "username" = 'alex'),'BOARD');
insert into public.user_roles_role ("userId", "roleName") values ((select "id" from public.user where "username" = 'alex'),'ADMINISTRATOR');
