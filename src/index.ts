import { PartitionKeyEvent } from "./types";
import { MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } from "./constants";
import { createHashFromString } from "./utils";

/**
 * Get Candidate deterministic partition key
 *
 * @export
 * @param {PartitionKeyEvent} [event]
 * @return {*}  {string}
 */
export function deterministicPartitionKey(
  event?: PartitionKeyEvent
): string {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    // if partitionKey exist return it, if not create a has from the event object
    candidate =
      event.partitionKey || createHashFromString(JSON.stringify(event));
  }

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHashFromString(candidate);
  }

  return candidate;
}
