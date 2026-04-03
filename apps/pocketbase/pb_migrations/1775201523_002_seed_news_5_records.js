/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const record0 = new Record(collection);
    record0.set("title", "Government Launches New Digital Initiative / \u0938\u0930\u0915\u093e\u0930 \u0928\u0947 \u0928\u0908 \u0921\u093f\u091c\u093f\u091f\u0932 \u092a\u0939\u0932 \u0936\u0941\u0930\u0942 \u0915\u0940");
    record0.set("content", "The Government has announced a comprehensive digital initiative aimed at modernizing public services and improving citizen engagement. This initiative includes the development of new digital platforms, enhanced cybersecurity measures, and training programs for government employees. The project is expected to significantly improve service delivery and reduce administrative burden on citizens.");
    record0.set("excerpt", "New digital initiative launched to modernize public services");
    record0.set("author", "Government Communications");
    record0.set("date", "2026-03-28");
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
    record1.set("title", "Infrastructure Development Project Update / \u092c\u0941\u0928\u093f\u092f\u093e\u0926\u0940 \u0922\u093e\u0902\u091a\u093e \u0935\u093f\u0915\u093e\u0938 \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u0905\u092a\u0921\u0947\u091f");
    record1.set("content", "The Ministry of Infrastructure has released an update on the ongoing infrastructure development projects across the nation. Major progress has been made on highway construction, railway expansion, and urban development initiatives. The projects are on schedule and within budget, with completion expected by the end of 2026. These developments will significantly boost economic growth and improve connectivity.");
    record1.set("excerpt", "Infrastructure projects progressing on schedule");
    record1.set("author", "Ministry of Infrastructure");
    record1.set("date", "2026-03-25");
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
    record2.set("title", "Public Health Campaign Announcement / \u091c\u0928\u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u0905\u092d\u093f\u092f\u093e\u0928 \u0918\u094b\u0937\u0923\u093e");
    record2.set("content", "The Health Ministry has launched a nationwide public health campaign focused on preventive healthcare and wellness awareness. The campaign includes free health checkup camps, vaccination drives, and educational programs on nutrition and lifestyle. Citizens are encouraged to participate in these initiatives to improve their health and well-being. Registration for health camps is now open.");
    record2.set("excerpt", "Nationwide health campaign launched for citizen wellness");
    record2.set("author", "Health Ministry");
    record2.set("date", "2026-03-20");
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
    record3.set("title", "Education Sector Reforms / \u0936\u093f\u0915\u094d\u0937\u093e \u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u0938\u0941\u0927\u093e\u0930");
    record3.set("content", "The Ministry of Education has announced comprehensive reforms in the education sector aimed at improving quality of education and making it more accessible. Key initiatives include curriculum modernization, teacher training programs, digital learning resources, and infrastructure upgrades in schools. These reforms are designed to prepare students for the challenges of the 21st century and enhance their employability.");
    record3.set("excerpt", "Education sector reforms to improve quality and accessibility");
    record3.set("author", "Ministry of Education");
    record3.set("date", "2026-03-15");
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
    record4.set("title", "Economic Growth Report / \u0906\u0930\u094d\u0925\u093f\u0915 \u0935\u0943\u0926\u094d\u0927\u093f \u0930\u093f\u092a\u094b\u0930\u094d\u091f");
    record4.set("content", "The Finance Ministry has released the latest economic growth report showing positive trends across major sectors. GDP growth has exceeded expectations, with strong performance in manufacturing, services, and agriculture. The report highlights increased foreign investment, improved export performance, and robust domestic consumption. These indicators suggest a strong economic outlook for the coming quarters.");
    record4.set("excerpt", "Economic growth exceeds expectations across sectors");
    record4.set("author", "Finance Ministry");
    record4.set("date", "2026-03-10");
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
