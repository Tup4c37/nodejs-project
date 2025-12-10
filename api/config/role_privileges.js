module.exports = {
    privGroups:[
        {
            id: "USERS",
            name:"User Permissions"
        },
        {
            id: "ROLES",
            name: "Role Permissions"
        },
        {
            id: "CATEGORIES",
            name: "Category Permissions"
        },
        {
            id: "AUDITLOGS",
            name: "Auditlogs Permissions"
        },
    ],
    privileges:[
        {
            key:"user_view",
            name:"User View",
            group:"Users",
            description:"User view"
        },
        {
            key:"user_add",
            name:"User Add",
            group:"Users",
            description:"User add"
        },
        {
            key:"user_update",
            name:"User Update",
            group:"Users",
            description:"User update"
        },
        {
            key:"user_delete",
            name:"User Delete",
            group:"Users",
            description:"User delete"
        },
        {
            key:"role_view",
            name:"Role View",
            group:"Roles",
            description:"Role view"
        },
        {
            key:"role_add",
            name:"Role Add",
            group:"Roles",
            description:"Role add"
        },
        {
            key:"role_update",
            name:"Role Update",
            group:"Roles",
            description:"Role update"
        },
        {
            key:"role_delete",
            name:"Role Delete",
            group:"Roles",
            description:"Role delete"
        },
        {
            key:"category_view",
            name:"Category View",
            group:"CATEGORIES",
            description:"Category view"
        },
        {
            key:"category_add",
            name:"Category Add",
            group:"CATEGORIES",
            description:"Category add"
        },
        {
            key:"category_update",
            name:"Category Update",
            group:"CATEGORIES",
            description:"Category update"
        },
        {
            key:"category_delete",
            name:"Category Delete",
            group:"CATEGORIES",
            description:"Category delete"
        },
        {
            key:"category_export",
            name:"Category Export",
            group:"CATEGORIES",
            description:"Category export"
        },
        {
            key:"auditlogs_view",
            name:"Auditlogs View",
            group:"AUDITLOGS",
            description:"Auditlogs view"
        }
        
    ]
};