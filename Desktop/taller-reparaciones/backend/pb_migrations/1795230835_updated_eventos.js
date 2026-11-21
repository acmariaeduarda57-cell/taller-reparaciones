/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4201693797")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3299786656",
    "help": "",
    "hidden": false,
    "id": "relation3777548247",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "orden",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4201693797")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3299786656",
    "help": "",
    "hidden": false,
    "id": "relation3777548247",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "orden",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
