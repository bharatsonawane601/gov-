/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_submissions");

  const existing = collection.fields.getByName("read");
  if (existing) {
    if (existing.type === "bool") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("read"); // exists with wrong type, remove first
  }

  collection.fields.add(new BoolField({
    name: "read",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("contact_submissions");
  collection.fields.removeByName("read");
  return app.save(collection);
})
