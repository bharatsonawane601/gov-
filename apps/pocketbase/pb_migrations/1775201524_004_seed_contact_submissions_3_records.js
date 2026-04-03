/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_submissions");

  const record0 = new Record(collection);
    record0.set("name", "Rajesh Kumar");
    record0.set("email", "rajesh@example.com");
    record0.set("message", "Inquiry about government services");
    record0.set("read", false);
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
    record1.set("name", "Priya Singh");
    record1.set("email", "priya@example.com");
    record1.set("message", "Feedback on portal usability");
    record1.set("read", false);
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
    record2.set("name", "Amit Patel");
    record2.set("email", "amit@example.com");
    record2.set("message", "Request for information about new initiatives");
    record2.set("read", false);
  try {
    app.save(record2);
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
