/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("gallery");

  const record0 = new Record(collection);
    record0.set("title", "Government Building / \u0938\u0930\u0915\u093e\u0930\u0940 \u092d\u0935\u0928");
    record0.set("type", "image");
    record0.set("category", "Infrastructure");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("title", "Administrative Office / \u092a\u094d\u0930\u0936\u093e\u0938\u0928\u093f\u0915 \u0915\u093e\u0930\u094d\u092f\u093e\u0932\u092f");
    record1.set("type", "image");
    record1.set("category", "Infrastructure");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("title", "Official Event / \u0906\u0927\u093f\u0915\u093e\u0930\u093f\u0915 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e");
    record2.set("type", "image");
    record2.set("category", "Events");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("title", "Public Service Center / \u091c\u0928\u0938\u0947\u0935\u093e \u0915\u0947\u0902\u0926\u094d\u0930");
    record3.set("type", "image");
    record3.set("category", "Services");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("title", "Government Ceremony / \u0938\u0930\u0915\u093e\u0930\u0940 \u0938\u092e\u093e\u0930\u094b\u0939");
    record4.set("video_url", "https://www.youtube.com/embed/dQw4w9WgXcQ");
    record4.set("type", "video");
    record4.set("category", "Events");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
