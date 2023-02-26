import { deterministicPartitionKey } from ".";
import { TRIVIAL_PARTITION_KEY } from "./constants";
import { PartitionKeyEvent } from "./types";
import { createHashFromString } from "./utils";

describe("test deterministicPartitionKey function", () => {
  describe("event has partition key", () => {
    it("should return partitionKey value if partition key is string less than 256 length", () => {
      const event: PartitionKeyEvent = { partitionKey: "test" };
      const result = deterministicPartitionKey(event);
      expect(result).toEqual(event.partitionKey);
    });
    it("should return '0' value if the event is undefined", () => {
      const result = deterministicPartitionKey();
      expect(result).toEqual(TRIVIAL_PARTITION_KEY);
    });
    it("should return hashed value if the event is event length is greater than 256", () => {
      const event: PartitionKeyEvent = {
        partitionKey: {
          id: "1234abc",
          name: "Jeffry",
          description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum necessitatibus inventore doloribus, corrupti quasi veritatis molestias, aliquid, illo nemo consectetur eveniet id deleniti? Illum nam eius quae recusandae ducimus maxime.",
        },
      };
      const result = deterministicPartitionKey(event);
      expect(result).toHaveLength(128);
    });
    it("should return hashed value if the event does not include the partitionKey attribute", () => {
      const event = {
        partitionKeyXXXXXXX: {
          id: "1234abc",
          name: "Jeffry",
          description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum necessitatibus inventore doloribus, corrupti quasi veritatis molestias, aliquid, illo nemo consectetur eveniet id deleniti? Illum nam eius quae recusandae ducimus maxime.",
        },
      };
      const result = deterministicPartitionKey(event as any);
      expect(result).toHaveLength(128);
    });
  });
});

describe("test utils", () => {
  it("Should return hash from string", () => {
    expect(createHashFromString("test")).toHaveLength(128);
  });
});
