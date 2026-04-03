/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let collection = new Collection({
        type: "auth",
        name: "admin_users",
        listRule: "@request.auth.collectionName = \"admin_users\"",
        viewRule: "@request.auth.collectionName = \"admin_users\"",
        createRule: null,
        updateRule: "@request.auth.id != \"\"",
        deleteRule: "@request.auth.id != \"\"",
        manageRule: "@request.auth.collectionName = \"admin_users\"",
        fields: [
        {
                "hidden": false,
                "id": "text9056669857",
                "name": "name",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": false,
                "type": "text",
                "autogeneratePattern": "",
                "max": 0,
                "min": 0,
                "pattern": ""
        },
        {
                "hidden": false,
                "id": "select3972882584",
                "name": "role",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "select",
                "maxSelect": 1,
                "values": [
                        "admin",
                        "editor",
                        "viewer"
                ]
        },
        {
                "hidden": false,
                "id": "date2072171457",
                "name": "last_login",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "date",
                "max": "",
                "min": ""
        }
],
    })

    try {
        app.save(collection)
    } catch (e) {
        if (e.message.includes("Collection name must be unique")) {
            console.log("Collection already exists, skipping")
            return
        }
        throw e
    }
}, (app) => {
    try {
        let collection = app.findCollectionByNameOrId("admin_users")
        app.delete(collection)
    } catch (e) {
        if (e.message.includes("no rows in result set")) {
            console.log("Collection not found, skipping revert");
            return;
        }
        throw e;
    }
})
