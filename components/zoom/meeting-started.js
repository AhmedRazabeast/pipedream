const zoom = {
  type: "app",
  app: "zoom",
};

module.exports = {
  name: "Meeting Started",
  version: "0.0.1",
  dedupe: "unique", // Dedupe based on meeting ID
  props: {
    zoom,
    zoomApphook: {
      type: "$.interface.apphook",
      appProp: "zoom",
      eventNames: ["meeting.started"],
    },
  },
  async run(event) {
    const { payload } = event;
    const { object } = payload;
    this.$emit(event, {
      summary: `Meeting ${object.topic} started`,
      id: object.uuid,
      ts: +new Date(object.start_time),
    });
  },
};
